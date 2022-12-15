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
import billApi from "../../../api/bill";
import Icon from "react-native-vector-icons/FontAwesome";
import { moneyFormatter } from "../../../utils/moneyFormatter";
import LeaserNavigator from "../../navigator/leaserNavigator";
const BillDetail = ({ route, navigation }) => {
  const [bill, setBill] = useState([]);
  const [type, setType] = useState("ELECTRICWATER");
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);
  useEffect(() => {
    if (route.params.id) {
      setLoading(true);
      billApi
        .getBillByRoomId(route.params.id, "all")
        .then((res) => {
          setBill(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [route.params.id, change]);

  const updateStatus = (id) => {
    billApi
      .updateBill(id, {
        mStatus: "Đã thanh toán",
      })
      .then((res) => {
        console.log(res);
        setChange(!change);
        Alert.alert("Cập nhật thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showAlert = (id) => {
    Alert.alert("Xác nhận cập nhật hóa đơn", "Yêu cầu này không thể hoàn tác", [
      {
        text: "Hủy",
        onPress: () => Alert.alert("Đã hủy yêu cầu"),
      },
      {
        text: "Xác nhận",
        onPress: () => updateStatus(id),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 10,
          paddingHorizontal: 5,
        }}
      >
        <Pressable
          style={type == "ELECTRICWATER" ? styles.navBtnClick : styles.navBtn}
          onPress={() => {
            setType("ELECTRICWATER");
          }}
        >
          <Text style={styles.navText}>Hóa đơn điện nước</Text>
        </Pressable>
        <Pressable
          style={type == "ROOM" ? styles.navBtnClick : styles.navBtn}
          onPress={() => {
            setType("ROOM");
          }}
        >
          <Text style={styles.navText}>Hóa đơn tiền nhà</Text>
        </Pressable>
      </View>
      {!loading ? (
        <ScrollView
          style={{
            width: "100%",
            marginBottom: 70,
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
            {bill
              .filter((item) => item.mType == type)
              .map((item) => {
                if (item.mType == "ELECTRICWATER") {
                  return (
                    <Pressable
                      key={item._id}
                      onPress={() => {
                        showAlert(item._id);
                      }}
                    >
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
                                item.mStatus == "Đã thanh toán"
                                  ? "green"
                                  : "red",
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
                } else {
                  return (
                    <Pressable
                      key={item._id}
                      onPress={() => {
                        showAlert(item._id);
                      }}
                    >
                      <View style={styles.item}>
                        <Icon name="paypal" size={40} color="black" />
                        <View
                          style={{
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
                        </View>
                        <View>
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
                                item.mStatus == "Đã thanh toán"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {item.mStatus}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                }
              })}
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <LeaserNavigator navigation={navigation} />
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
export default BillDetail;
