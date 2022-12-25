import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
} from "react-native";
import fixRequestApi from "../../api/fixRequest";
import roomApi from "../../api/room";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const ModifyLeaserHome = ({ route }) => {
  const [change, setChange] = useState(false);
  const [fixRequest, getFixRequest] = useState([]);
  const [room, getRoom] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (route.params.id) {
      fixRequestApi.getFixRequestByRoomId(route.params.id).then((res) => {
        getFixRequest(res);
      });
    }
  }, [route, change]);
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
  }, [route, change]);
  const checkoutRoom = () => {
    Alert.alert("Thông báo", "Xử lý yêu cầu trả phòng?", [
      {
        text: "Hủy",
        onPress: () => {},
      },
      {
        text: "Không đồng ý",
        onPress: () => {
          roomApi
            .updateRoom(room._id, {
              mStatus: "RENTED",
            })
            .then((res) => {
              Alert.alert("Thông báo", "Xử lý thành công");
              setChange(!change);
            })
            .catch((err) => {
              Alert.alert("Thông báo", "Xử lý thất bại");
            });
        },
      },
      {
        text: "Đồng ý",
        onPress: () => {
          roomApi
            .updateRoom(room._id, {
              mRenterId: "",
              mStatus: room.mCurPeople - 1 > 0 ? "RENTED" : "AVAILABLE",
              mCurPeople: room.mCurPeople - 1,
            })
            .then((res) => {
              Alert.alert("Thông báo", "Xử lý thành công");
              setChange(!change);
            })
            .catch((err) => {
              Alert.alert("Thông báo", "Xử lý thất bại");
            });
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
          marginBottom: 70,
        }}
        showsVerticalScrollIndicator={false}
      >
        {room.mStatus === "CANCELLED" && (
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
                color: "#ff2121",
                fontWeight: "bold",
                width: "100%",
                borderBottomColor: "#ABB4BD",
                borderBottomWidth: 1,
                padding: 5,
              }}
            >
              Có yêu cầu trả phòng
            </Text>
            <View
              style={{
                padding: 10,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={{
                  ...styles.item,
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderColor: "#ff2121",
                  backgroundColor: "#ff2121",
                }}
                onPress={checkoutRoom}
              >
                <View>
                  <Text
                    style={{
                      ...styles.itemText,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Phê duyệt yêu cầu
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        )}
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
            {fixRequest.length === 0 && (
              <Text
                style={{
                  ...styles.itemText,
                  color: "#000",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Không có yêu cầu sửa chữa
              </Text>
            )}
            {fixRequest.map((fixRequest) => {
              return (
                <Pressable
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
                  onPress={() => {
                    Alert.alert(
                      "Cập nhật yêu cầu sửa chữa",
                      "Bạn có muốn cập nhật yêu cầu sửa chữa này không?",
                      [
                        {
                          text: "Hủy",
                          onPress: () => {},
                          style: "cancel",
                        },

                        {
                          text: "Đồng ý sửa",
                          onPress: () => {
                            fixRequestApi
                              .updateFixRequest(fixRequest._id, {
                                mStatus: "ACCEPTED",
                              })
                              .then((res) => {
                                Alert.alert(
                                  "Thông báo",
                                  "Cập nhật yêu cầu sửa chữa thành công"
                                );
                                setChange(!change);
                              });
                          },
                        },
                        {
                          text: "Đã sửa xong",
                          onPress: () => {
                            fixRequestApi
                              .updateFixRequest(fixRequest._id, {
                                mStatus: "DONE",
                              })
                              .then((res) => {
                                Alert.alert(
                                  "Thông báo",
                                  "Cập nhật yêu cầu sửa chữa thành công"
                                );
                                setChange(!change);
                              });
                          },
                          style: "cancel",
                        },
                      ]
                    );
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
                    {
                      <Icon
                        style={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                        }}
                        onPress={() => {
                          Alert.alert(
                            "Thông báo",
                            "Bạn có chắc chắn muốn từ chối yêu cầu sửa chữa này không?",
                            [
                              {
                                text: "Hủy",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: "Từ chối sửa",
                                onPress: () => {
                                  fixRequestApi
                                    .updateFixRequest(fixRequest._id, {
                                      mStatus: "REJECTED",
                                    })
                                    .then((res) => {
                                      Alert.alert(
                                        "Thông báo",
                                        "Từ chối yêu cầu sửa chữa thành công"
                                      );
                                      setChange(!change);
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
                    }
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
                        ? "Đồng ý sửa"
                        : fixRequest.mStatus == "DONE"
                        ? "Đã hoàn thành"
                        : "Đã bị từ chối"}
                    </Text>
                  </View>
                </Pressable>
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

export default ModifyLeaserHome;
