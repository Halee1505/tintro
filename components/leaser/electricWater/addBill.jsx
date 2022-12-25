import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import roomApi from "../../../api/room";
import billApi from "../../../api/bill";
import notificationApi from "../../../api/notification";
import { moneyFormatter } from "../../../utils/moneyFormatter";

const AddBill = ({ change, roomId, userId, setShowAddBill, setChange }) => {
  const [showDate, setShowDate] = useState(false);
  const [pickDate, setPickDate] = useState(new Date());
  const [room, setRoom] = useState({});
  const [load, setLoad] = useState(false);
  const [billInfo, setBillInfo] = useState({
    mRoomId: roomId,
    mType: "ELECTRICWATER",
    mYear: Number(pickDate.getFullYear()),
    mMonth: Number(pickDate.getMonth() + 1),
    mPrice: 0,
    mStatus: "Chưa thanh toán",
    mWaterCount: 0,
    mElectricCount: 0,
  });
  useEffect(() => {
    setLoad(true);
    roomApi.getRoomById(roomId).then((res) => {
      setRoom(res);
      setLoad(false);
    });
  }, [roomId]);
  const onChange = (event, selectedDate) => {
    setShowDate(false);
    const currentDate = selectedDate || pickDate;
    setPickDate(currentDate);
    setBillInfo({
      ...billInfo,
      mYear: Number(currentDate.getFullYear()),
      mMonth: Number(currentDate.getMonth() + 1),
    });
  };

  const showMode = (currentMode) => {
    setShowDate(false);
    DateTimePickerAndroid.open({
      value: pickDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  const handleSubmit = () => {
    Alert.alert(
      "Xác nhận",
      `Xác nhận tạo hóa đơn ${room.mRoomName} \n
    tháng ${billInfo.mMonth} năm ${billInfo.mYear} \n
    Với giá tiền là ${Number(room.mRentPrice)} VND \n
    Số điện tiêu thụ là ${billInfo.mElectricCount} \n
    Số nước tiêu thụ là ${billInfo.mWaterCount} \n
    Giá tiền điện nước là ${
      billInfo.mWaterCount * Number(room.mWaterPrice) +
      billInfo.mElectricCount * Number(room.mElectricityPrice)
    } VND
    `,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            createBill();
          },
        },
      ]
    );
  };

  const createBill = () => {
    setLoad(true);
    billApi
      .createBill({
        ...billInfo,
        mPrice: Number(room.mRentPrice),
        mType: "ROOM",
      })
      .then((res) => {
        billApi
          .createBill({
            ...billInfo,
            mPrice:
              billInfo.mWaterCount * Number(room.mWaterPrice) +
              billInfo.mElectricCount * Number(room.mElectricityPrice),
            mType: "ELECTRICWATER",
          })
          .then((res) => {
            notificationApi
              .createNotification({
                mRoomId: roomId,
                mUserId: userId,
                mType: "ROOM",
              })
              .then((res) => {
                notificationApi
                  .createNotification({
                    mRoomId: roomId,
                    mUserId: userId,
                    mType: "ELECTRICWATER",
                  })
                  .then((res) => {
                    Alert.alert("Thành công", "Tạo hóa đơn thành công");

                    setChange(!change);
                    setLoad(false);
                    setShowAddBill(false);
                  })
                  .catch((err) => {
                    setLoad(false);
                  });
              })
              .catch((err) => {
                setLoad(false);
              });
          })
          .catch((err) => {
            console.log(err);
            setLoad(false);
            Alert.alert("Lỗi", "Không thể tạo hóa đơn");
          });
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        Alert.alert("Lỗi", "Không thể tạo hóa đơn");
      });
  };

  return (
    <Pressable
      style={styles.overlay}
      onPress={() => {
        setShowAddBill(false);
      }}
    >
      <View style={styles.contain}>
        <Text style={styles.roomExtensionTitle}>Thêm hóa đơn</Text>
        {load ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <View style={styles.roomItem}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginVertical: 5,
                }}
              >
                Ngày tạo hóa đơn
              </Text>

              <View style={styles.roomItem}>
                <Pressable style={styles.roomInput} onPress={showDatePicker}>
                  <Text>{formatDate(pickDate)}</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.roomItem}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginVertical: 5,
                }}
              >
                Tiền phòng
              </Text>

              <View style={styles.roomItem}>
                <Text
                  style={{
                    ...styles.roomInput,
                    height: 40,
                  }}
                >
                  {moneyFormatter(room.mRentPrice)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.roomItem}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginVertical: 5,
                  }}
                >
                  Số điện
                </Text>

                <View>
                  <TextInput
                    style={{
                      ...styles.roomInput,
                      width: 150,
                      height: 40,
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setBillInfo({
                        ...billInfo,
                        mElectricCount: Number(text),
                      });
                    }}
                  />
                </View>
              </View>
              {/* = */}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginVertical: 5,
                  textAlignVertical: "center",
                  height: 40,
                  marginTop: 30,
                }}
              >
                =
              </Text>
              <View style={styles.roomItem}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginVertical: 5,
                  }}
                >
                  Thành tiền
                </Text>
                <Text
                  style={{
                    ...styles.roomInput,
                    width: 150,
                    height: 40,
                  }}
                >
                  {moneyFormatter(
                    billInfo.mElectricCount * Number(room.mElectricityPrice)
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.roomItem}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginVertical: 5,
                  }}
                >
                  Số nước
                </Text>

                <View>
                  <TextInput
                    style={{
                      ...styles.roomInput,
                      width: 150,
                      height: 40,
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setBillInfo({ ...billInfo, mWaterCount: Number(text) });
                    }}
                  />
                </View>
              </View>
              {/* = */}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginVertical: 5,
                  textAlignVertical: "center",
                  height: 40,
                  marginTop: 30,
                }}
              >
                =
              </Text>
              <View style={styles.roomItem}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    marginVertical: 5,
                  }}
                >
                  Thành tiền
                </Text>
                <View>
                  <Text
                    style={{
                      ...styles.roomInput,
                      width: 150,
                      height: 40,
                    }}
                  >
                    {moneyFormatter(
                      billInfo.mWaterCount * Number(room.mWaterPrice)
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
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
            onPress={handleSubmit}
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
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 10,
    paddingHorizontal: 10,
    zIndex: 100,
  },
  contain: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 5,
  },
  roomExtensionTitle: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "#ABB4BD",
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  roomItem: {
    marginBottom: 10,
  },
  roomInput: {
    width: "100%",
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
});
export default AddBill;
