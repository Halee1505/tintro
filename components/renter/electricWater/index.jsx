import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import roomApi from "../../../api/room";
import billApi from "../../../api/bill";
import Icon from "react-native-vector-icons/FontAwesome";
import { moneyFormatter } from "../../../utils/moneyFormatter";
const ElectricWater = ({ route, navigation }) => {
  const { userId } = route.params;

  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [bill, setBill] = useState([]);

  useEffect(() => {
    if (!userId) return navigation.navigate("RENTER/my-room");
    setLoading(true);
    roomApi
      .getRoomByRenterId(userId)
      .then((res) => {
        if (!res) {
          Alert.alert("Bạn chưa có phòng nào");
          navigation.navigate("RENTER/my-room");
          return;
        }
        setRoom(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Thông báo", "Lỗi kết nối");
        navigation.navigate("RENTER/my-room");
      });
  }, [route]);

  useEffect(() => {
    if (room._id) {
      setLoading(true);
      billApi
        .getBillByRoomId(room._id, "ELECTRICWATER")
        .then((res) => {
          setLoading(false);
          setBill(res);
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert("Thông báo", "Lỗi kết nối");
          navigation.navigate("RENTER/my-room");
        });
    }
  }, [room]);

  console.log(bill);
  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView
          style={{
            width: "100%",
            marginBottom: 60,
            backgroundColor: "#fff",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingHorizontal: 10,
              width: "100%",
              backgroundColor: "#fff",
              paddingVertical: 10,
            }}
          >
            {bill.length == 0 && (
              <Text style={{ textAlign: "center" }}>Không có hóa đơn</Text>
            )}
            {bill.map((item) => {
              return (
                <Pressable key={item._id}>
                  <View style={styles.item}>
                    <Icon name="paypal" size={40} color="black" />
                    <View
                      style={{
                        borderRightWidth: 2,
                        borderRightColor: "#ABB4BD",
                        marginRight: "auto",
                        marginLeft: 10,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Tháng {item.mMonth}/{item.mYear}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#2F80ED",
                        }}
                      >
                        {moneyFormatter(item.mPrice)}
                      </Text>
                      <Text
                        style={{
                          color:
                            item.mStatus == "Đã thanh toán" ? "green" : "red",
                        }}
                      >
                        {item.mStatus}
                      </Text>
                    </View>

                    <View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="plug" size={20} color="black" />
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#2F80ED",
                            marginLeft: 5,
                          }}
                        >
                          {item.mElectricCount}kW
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="shower" size={20} color="black" />
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 16,
                            color: "#2F80ED",
                          }}
                        >
                          {item.mWaterCount}m3
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  navBtn: {
    width: "50%",
    height: 40,
    backgroundColor: "#e0e0e0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#ABB4BD",
  },
  navBtnClick: {
    width: "50%",
    height: 40,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderBottomWidth: 0,
    borderColor: "#ABB4BD",
  },
  navText: {
    fontSize: 16,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
});
export default ElectricWater;
