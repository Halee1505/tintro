import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Navigator from "../../navigator";
import roomApi from "../../../api/room";
import fixRequestApi from "../../../api/fixRequest";
import { useEffect, useState } from "react";
import { moneyFormatter } from "../../../utils/moneyFormatter";
import FixRequest from "./fixRequest";
import Icon from "react-native-vector-icons/FontAwesome";

const ManageRoom = ({ navigation, route }) => {
  const [room, setRoom] = useState({});
  const [change, setChange] = useState(false);
  const [showFixRequest, setShowFixRequest] = useState(false);
  const [fixRequest, setFixRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (route.params.userId) {
      setLoading(true);
      roomApi
        .getRoomByRenterId(route.params.userId)
        .then((res) => {
          if (res) {
            setRoom(res);
            setLoading(false);
          } else {
            setLoading(false);
            Alert.alert("Thông báo", "Bạn chưa có phòng nào");
            navigation.navigate("RENTER/my-room");
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [route.params.userId, change]);

  useEffect(() => {
    if (room._id) {
      setLoading(true);
      fixRequestApi.getFixRequestByRoomId(room._id).then((res) => {
        setLoading(false);
        setFixRequest(res);
      });
    }
  }, [room._id, change]);

  const checkoutRoom = (roomId) => {
    if (room.mRenterId !== route.params.userId) {
      Alert.alert("Thông báo", "Bạn đã trả phòng này rồi");
      return;
    }
    Alert.alert("Thông báo", "Bạn có muốn trả phòng này không?", [
      {
        text: "Hủy",
        onPress: () => {},
      },
      {
        text: "Đồng ý",
        onPress: () => {
          roomApi
            .updateRoom(roomId, {
              mRenterId: "",
              mStatus: "AVAILABLE",
              mCurPeople: room.mCurPeople - 1,
            })
            .then((res) => {
              Alert.alert("Thông báo", "Trả phòng thành công");
              navigation.navigate("RENTER/my-room");
              setChange(!change);
            })
            .catch((err) => {
              Alert.alert("Thông báo", "Trả phòng thất bại");
            });
        },
      },
    ]);
  };
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ABB4BD",
          borderRadius: 10,
          borderLeftWidth: 2,
          borderTopWidth: 2,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#3772FF",
            fontWeight: "bold",
            width: "100%",
            borderBottomColor: "#ABB4BD",
            borderBottomWidth: 1,
            padding: 5,
          }}
        >
          Thông tin phòng
        </Text>
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.item}>
            <Text style={styles.itemText}>Tên phòng</Text>
            <Text>{room.mRoomName}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Giá thuê</Text>
            <Text>{moneyFormatter(room.mRentPrice)}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Diện tích</Text>
            <Text>{room.mArea}m2</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Giá điện</Text>
            <Text>{moneyFormatter(room.mElectricityPrice)}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Ngày chốt điện nước</Text>
            <Text>{room.mRoomName}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Giá nước</Text>
            <Text>{moneyFormatter(room.mWaterPrice)}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#ff2121",
              borderRadius: 10,
              margin: 10,
              alignItems: "center",
              width: "50%",
            }}
            onPress={() => checkoutRoom(room._id)}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Yêu cầu trả phòng
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ABB4BD",
          borderRadius: 10,
          borderLeftWidth: 2,
          borderTopWidth: 2,
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#3772FF",
            fontWeight: "bold",
            width: "100%",
            borderBottomColor: "#ABB4BD",
            borderBottomWidth: 1,
            padding: 5,
          }}
        >
          Yêu cầu sửa chữa
        </Text>
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {fixRequest.map((fixRequest) => {
            return (
              <View
                key={fixRequest._id}
                style={{
                  ...styles.item,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  position: "relative",
                }}
              >
                <View>
                  <Text style={styles.itemText}>{fixRequest.mTitle}</Text>
                  <Text>{fixRequest.mDescription}</Text>
                </View>
                <View
                  style={{
                    height: "100%",
                  }}
                >
                  {fixRequest.mStatus == "PENDING" && (
                    <Icon
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                      }}
                      onPress={() => {
                        Alert.alert(
                          "Thông báo",
                          "Bạn có chắc chắn muốn hủy yêu cầu sửa chữa này không?",
                          [
                            {
                              text: "Hủy",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "Đồng ý",
                              onPress: () => {
                                fixRequestApi
                                  .deleteFixRequest(fixRequest._id)
                                  .then((res) => {
                                    Alert.alert(
                                      "Thông báo",
                                      "Hủy yêu cầu sửa chữa thành công"
                                    );
                                    setChange(!change);
                                  })
                                  .catch((err) => {
                                    Alert.alert(
                                      "Thông báo",
                                      "Hủy yêu cầu sửa chữa thất bại"
                                    );
                                  });
                              },
                            },
                          ]
                        );
                      }}
                      name="close"
                      size={20}
                      color="#ff2121"
                    />
                  )}
                  <Text
                    style={{
                      position: "absolute",
                      bottom: -5,
                      right: -2,
                      color:
                        fixRequest.mStatus == "PENDING"
                          ? "#ABB4BD"
                          : fixRequest.mStatus == "ACCEPTED"
                          ? "#3772FF"
                          : fixRequest.mStatus == "DONE"
                          ? "#2ecc71"
                          : "#ff2121",
                    }}
                  >
                    {fixRequest.mStatus == "PENDING"
                      ? "Đang chờ xử lý"
                      : fixRequest.mStatus == "ACCEPTED"
                      ? "Đã được xử lý"
                      : fixRequest.mStatus == "DONE"
                      ? "Đã hoàn thành"
                      : "Đã bị từ chối"}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#3772FF",
            borderRadius: 10,
            margin: 10,
            alignItems: "center",
            width: "50%",
          }}
          onPress={() => setShowFixRequest(true)}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Tạo yêu cầu
          </Text>
        </Pressable>
      </View>
      {showFixRequest && (
        <FixRequest
          change={change}
          setChange={setChange}
          roomId={room._id}
          setShowFixRequest={setShowFixRequest}
        />
      )}
      <Navigator navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  item: {
    width: "48%",
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3772FF",
  },
});

export default ManageRoom;
