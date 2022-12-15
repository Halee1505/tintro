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
import AddBill from "./addBill";
import roomApi from "../../../api/room";
import billApi from "../../../api/bill";
import Icon from "react-native-vector-icons/FontAwesome";
import { moneyFormatter } from "../../../utils/moneyFormatter";
const ElectricWaterDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [showAddBill, setShowAddBill] = useState(false);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bill, setBill] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      billApi
        .getBillByRoomId(id, "ELECTRICWATER")
        .then((res) => {
          setLoading(false);
          setBill(res);
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert("Thông báo", "Lỗi kết nối");
          navigation.navigate("LEASER/electricWater");
        });
    }
  }, [route, change]);

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
      <Pressable
        onPress={() => {
          setShowAddBill(true);
        }}
        style={styles.addOverlay}
      >
        <Text style={styles.addContent}>+</Text>
      </Pressable>
      {showAddBill && (
        <AddBill
          change={change}
          setChange={setChange}
          setShowAddBill={setShowAddBill}
          roomId={id}
          userId={route.params.userId}
        />
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
  addOverlay: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  addContent: {
    color: "#fff",
    fontSize: 30,
  },
});
export default ElectricWaterDetail;
