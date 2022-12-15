import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import moment from "moment";
import { Extension } from "../../model/room.js";
import { moneyFormatter } from "../../utils/moneyFormatter";
import Icon from "react-native-vector-icons/FontAwesome";
import { extension } from "../../utils/extension";
import roomApi from "../../api/room";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

function RoomDetail({ navigation, route }) {
  const user = useSelector((state) => state.loginUserReducer);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { roomId } = route.params;
  const [room, setRoom] = useState({});
  useEffect(() => {
    if (roomId) {
      setLoading(true);
      roomApi.getRoomById(roomId).then((res) => {
        setRoom(res);
        setLoading(false);
      });
    }
  }, [route, change]);

  const registerRoom = () => {
    if (room.mRenterId === user.user._id) {
      Alert.alert("Thông báo", "Bạn đã đăng ký phòng này rồi");
      return;
    }
    Alert.alert("Thông báo", "Bạn có muốn đăng ký phòng này không?", [
      {
        text: "Hủy",
        onPress: () => {},
      },
      {
        text: "Đồng ý",
        onPress: () => {
          roomApi
            .updateRoom(roomId, {
              mRenterId: user.user._id,
              mStatus:
                room.mCurPeople + 1 == room.mMaxPeople ? "RENTED" : "AVAILABLE",
              mCurPeople: room.mCurPeople + 1,
            })
            .then((res) => {
              Alert.alert("Thông báo", "Đăng ký phòng thành công");
              setChange(!change);
            })
            .catch((err) => {
              Alert.alert("Thông báo", "Đăng ký phòng thất bại");
            });
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return Object.keys(room).length > 0 ? (
    <ScrollView style={style.container}>
      <View
        style={{
          height: 250,
        }}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {room.mImageUrl?.map((url, index) => {
            return (
              <View
                key={index}
                style={{ width: Dimensions.get("window").width, height: 250 }}
              >
                <Image
                  source={{ uri: url }}
                  resizeMethod="scale"
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <Text style={style.roomName}>{room.mRoomName}</Text>
      <View
        style={{
          ...style.roomDetail,
        }}
      >
        <View
          style={{
            ...style.horizontal,
            marginBottom: 10,
          }}
        >
          <View style={style.textIconOverlay}>
            <Icon name="money" size={18} color="black" />
            <Text
              style={{
                ...style.roomDetailText,
                color: "#3772FF",
              }}
            >
              {moneyFormatter(room.mRentPrice)}
            </Text>
          </View>
          <View style={style.textIconOverlay}>
            <Icon name="home" size={18} color="black" />
            <Text style={style.roomDetailText}>{room.mArea}m2</Text>
          </View>
          <View style={style.textIconOverlay}>
            <Icon name="clock-o" size={18} color="black" />

            <Text style={style.roomDetailText}>
              {moment(new Date() - new Date(room.mCreated)).format("HH:SS")}{" "}
              phút
            </Text>
          </View>
        </View>
        <View style={style.textIconOverlay}>
          <Icon name="globe" size={18} color="black" />
          <Text style={style.roomDetailText}>{room.mAddress}</Text>
        </View>
      </View>
      <View
        style={{
          ...style.roomDescription,
        }}
      >
        <Text
          style={{
            ...style.roomDetailText,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#3772FF",
          }}
        >
          Tiện ích phòng
        </Text>
        <View
          style={{
            ...style.horizontal,
            flexWrap: "wrap",
            width: "100%",
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 10,
            padding: 10,
          }}
        >
          {room.mExtensions?.map((item, index) => {
            return (
              <View
                style={{
                  marginRight: 10,
                }}
                key={index}
              >
                <Image
                  style={{
                    marginBottom: 10,
                  }}
                  source={extension[item]?.image}
                />
              </View>
            );
          })}
        </View>
        <Text
          style={{
            ...style.roomDetailText,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 10,
            color: "#3772FF",
          }}
        >
          Mô tả chi tiết
        </Text>
        <View
          style={{
            ...style.horizontal,
            flexWrap: "wrap",
            width: "100%",
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={style.roomDetailText}>{room.mDescription}</Text>
        </View>
        <View
          style={{
            ...style.horizontal,
            width: "100%",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Pressable
            style={{
              ...style.btn,
              backgroundColor:
                room.mRenterId === user.user._id ? "#ccc" : "#3772FF",
            }}
            onPress={registerRoom}
          >
            {room.mRenterId === user.user._id ? (
              <Text
                style={{
                  ...style.btnText,
                  color: "#fff",
                }}
              >
                Đã đăng ký
              </Text>
            ) : (
              <Text
                style={{
                  ...style.btnText,
                  color: "#fff",
                }}
              >
                Đăng ký phòng
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  ) : (
    <Text
      style={{
        fontSize: 14,
        width: "100%",
        textAlign: "center",
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      Đang tải...
    </Text>
  );
}
const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    marginBottom: 60,
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  extensionIcon: {
    width: 40,
    height: 40,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  textIconOverlay: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  roomName: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 10,
  },
  roomDetail: {
    width: "90%",
    height: "auto",
    marginTop: 10,
    padding: 10,
    marginLeft: "5%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  roomDescription: {
    width: "90%",
    height: "auto",
    marginTop: 10,
    marginLeft: "5%",
  },
  roomDetailText: {
    fontSize: 14,
    marginLeft: 5,
  },
  btn: {
    width: "40%",
    height: 40,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    textTransform: "uppercase",
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};

export default connect(mapStateToProps)(RoomDetail);
