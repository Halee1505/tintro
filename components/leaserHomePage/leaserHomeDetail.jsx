import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import roomApi from "../../api/room";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { extension } from "../../utils/extension";

const LeaserHomeDetail = ({ route, navigation }) => {
  const [room, getRoom] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (route.params.id) {
      setLoading(true);
      roomApi
        .getRoomById(route.params.id)
        .then((res) => {
          getRoom(res);
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert("Lỗi", "Không thể lấy thông tin phòng trọ");
          setLoading(false);
        });
    }
  }, [route]);
  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <View style={styles.container}>
      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "#ABB4BD",
          width: "90%",
          borderWidth: 1,
          borderTopWidth: 5,
          borderLeftWidth: 5,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        onPress={() =>
          navigation.navigate("LEASER/home-page/detail/modify", {
            id: room._id,
            mStatus: room.mStatus,
            mCurPeople: room.mCurPeople,
          })
        }
      >
        <Text
          style={{
            fontSize: 20,
            margin: 0,
            marginRight: 10,
            fontWeight: "bold",
          }}
        >
          Quản lý phòng
        </Text>
        <Icon name="chevron-right" color="black" size={20} />
      </Pressable>
      <ScrollView
        style={{
          width: "100%",
          marginBottom: 70,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            borderColor: "#ABB4BD",
            borderWidth: 1,
            borderBottomWidth: 5,
            marginTop: 10,
          }}
        >
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Tên phòng trọ</Text>
            <Text style={styles.textRight}>{room.mRoomName}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Lượng người ở</Text>
            <Text style={styles.textRight}>
              {room.mCurPeople}/{room.mMaxPeople}
            </Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Diện tích</Text>
            <Text style={styles.textRight}>{room.mArea}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Giá thuê</Text>
            <Text style={styles.textRight}>{room.mRentPrice}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Giá điện(1kW)</Text>
            <Text style={styles.textRight}>{room.mElectricityPrice}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Giá nước(1m3)</Text>
            <Text style={styles.textRight}>{room.mWaterPrice}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Ngày chốt sổ</Text>
            <Text style={styles.textRight}>
              {moment(room.mClosingDate).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.textLeft}>Địa chỉ</Text>
            <Text style={styles.textRight}>{room.mAddress}</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            borderColor: "#ABB4BD",
            borderWidth: 1,
            borderBottomWidth: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              borderBottomColor: "#ABB4BD",
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            Tiện ích phòng
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
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
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            borderColor: "#ABB4BD",
            borderWidth: 1,
            borderBottomWidth: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              borderBottomColor: "#ABB4BD",
              borderBottomWidth: 1,
            }}
          >
            Mô tả phòng
          </Text>
          <Text style={styles.textLeft}>Tiêu đề</Text>
          <Text style={styles.textRight}>{room.mTitle}</Text>
          <Text style={styles.textLeft}>Mô tả chi tiết</Text>
          <Text style={styles.textRight}>{room.mDescription}</Text>
          <Text style={styles.textLeft}>Hình ảnh</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {room?.mImageUrl?.map((item, index) => {
              return (
                <Image
                  key={index}
                  source={{ uri: item }}
                  style={{
                    width: "32%",
                    height: 100,
                    marginBottom: 8,
                    borderRadius: 10,
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  itemInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textLeft: {
    fontSize: 16,
    fontWeight: "bold",
    width: "40%",
  },
  textRight: {
    fontSize: 15,
    color: "#2F80ED",
    width: "60%",
  },
});

export default LeaserHomeDetail;
