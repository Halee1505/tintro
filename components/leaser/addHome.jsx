import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { connect } from "react-redux";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import LeaserNavigator from "../navigator/leaserNavigator";

import { useDispatch, useSelector } from "react-redux";
import { CREATE_NEW_ROOM } from "../../redux/const";
const AddHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const [roomInfo, setRoomInfo] = useState({
    mRoomName: "",
    mMaxPeople: 0,
    mArea: 0,
    mRentPrice: 0,
    mElectricityPrice: 0,
    mWaterPrice: 0,
    mClosingDate: new Date(),
    mAddress: "",
  });
  const [showDate, setShowDate] = useState(false);
  const [benefit, setBenefit] = useState([]);
  function handlePressExtensions(bf) {
    if (benefit.includes(bf)) {
      setBenefit((benefit) => benefit.filter((item) => item !== bf));
    } else {
      setBenefit((benefit) => [...benefit, bf]);
    }
  }
  const onChange = (event, selectedDate) => {
    setShowDate(false);
    const currentDate = selectedDate || roomInfo.mClosingDate;
    setRoomInfo((roomInfo) => ({
      ...roomInfo,
      mClosingDate: currentDate,
    }));
  };

  const showMode = (currentMode) => {
    setShowDate(false);
    DateTimePickerAndroid.open({
      value: roomInfo.mClosingDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const handlePress = () => {
    dispatch({
      type: CREATE_NEW_ROOM,
      payload: {
        ...roomInfo,
        benefit,
      },
    });
    navigation.navigate("LEASER/add-home/next", {
      roomInfo: JSON.stringify({
        ...roomInfo,
        mExtensions: benefit,
      }),
    });
  };

  //format date to dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  return (
    <View style={styles.content}>
      <ScrollView
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.roomInformation}>
          <View style={styles.roomItem}>
            <Text>Tên phòng trọ</Text>
            <TextInput
              style={styles.roomInput}
              placeholder="Ví dụ: Phòng trọ 1"
              onChangeText={(text) => {
                setRoomInfo((roomInfo) => ({ ...roomInfo, mRoomName: text }));
              }}
            />
          </View>
          <View style={styles.roomItem}>
            <Text>Số người ở</Text>
            <TextInput
              style={styles.roomInput}
              placeholder="Ví dụ: 2"
              onChangeText={(text) => {
                setRoomInfo((roomInfo) => ({
                  ...roomInfo,
                  mMaxPeople: text,
                }));
              }}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.roomItem}>
            <Text>Diện tích</Text>
            <TextInput
              style={styles.roomInput}
              placeholder="Ví dụ: 20"
              keyboardType="numeric"
              onChangeText={(text) => {
                setRoomInfo((roomInfo) => ({ ...roomInfo, mArea: text }));
              }}
            />
          </View>
          <View style={styles.roomItem}>
            <Text>Giá thuê</Text>
            <TextInput
              style={styles.roomInput}
              placeholder="Ví dụ: 2000000"
              keyboardType="numeric"
              onChangeText={(text) => {
                setRoomInfo((roomInfo) => ({ ...roomInfo, mRentPrice: text }));
              }}
            />
          </View>
          <View style={styles.roomItem}>
            <Text>Giá điện(1kW)</Text>
            <TextInput
              style={styles.roomInput}
              placeholder="Ví dụ: 3000"
              keyboardType="numeric"
              onChangeText={(text) => {
                setRoomInfo((roomInfo) => ({
                  ...roomInfo,
                  mElectricityPrice: text,
                }));
              }}
            />
          </View>
          <View style={styles.roomItem}>
            <Text>Giá nước(1m3) </Text>
            <TextInput
              style={styles.roomInput}
              placeholder="Ví dụ: 14000"
              keyboardType="numeric"
              onChangeText={(text) => {
                setRoomInfo((roomInfo) => ({
                  ...roomInfo,
                  mWaterPrice: text,
                }));
              }}
            />
          </View>
          <View style={styles.roomItem}>
            <Text>Ngày chốt sổ</Text>
            <Pressable style={styles.roomInput} onPress={showDatePicker}>
              <Text>{formatDate(roomInfo.mClosingDate)}</Text>
            </Pressable>
            {showDate && (
              <DateTimePicker
                value={roomInfo.mClosingDate}
                onChange={(event, selectedDate) => {}}
                mode="date"
                display="spinner"
                style={{ width: 100 }}
              />
            )}
          </View>
          <View style={styles.roomItem}>
            <Text>Địa chỉ</Text>
            <TextInput
              style={styles.roomInput}
              placeholder="159/5, Bình Thắng, Dĩ An"
              onChangeText={(text) => {
                setRoomInfo((roomInfo) => ({ ...roomInfo, mAddress: text }));
              }}
            />
          </View>
        </View>
        <View style={styles.roomInformation}>
          <Text style={styles.roomExtensionTitle}>Tiện ích phòng</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.extensionsOverlay}
          >
            <View style={{ ...styles.extensions, height: 90 }}>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("AIR_CONDITIONER");
                }}
              >
                {benefit?.includes("AIR_CONDITIONER") ? (
                  <Image source={require("../../assets/pressedMayLanh.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedMayLanh.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("FRIDGE");
                }}
              >
                {benefit?.includes("FRIDGE") ? (
                  <Image source={require("../../assets/pressedTuLanh.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedTuLanh.png")} />
                )}
              </Pressable>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("WASHING_MACHINE");
                }}
              >
                {benefit?.includes("WASHING_MACHINE") ? (
                  <Image source={require("../../assets/pressedMayGiat.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedMayGiat.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("KITCHEN");
                }}
              >
                {benefit?.includes("KITCHEN") ? (
                  <Image source={require("../../assets/pressedNhaBep.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedNhaBep.png")} />
                )}
              </Pressable>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("FREE_TIME");
                }}
              >
                {benefit?.includes("FREE_TIME") ? (
                  <Image source={require("../../assets/pressedTuDo.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedTuDo.png")} />
                )}
              </Pressable>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("PARKING");
                }}
              >
                {benefit?.includes("PARKING") ? (
                  <Image source={require("../../assets/pressedChoDeXe.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedChoDeXe.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("WIFI");
                }}
              >
                {benefit?.includes("WIFI") ? (
                  <Image source={require("../../assets/pressedWifi.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedWifi.png")} />
                )}
              </Pressable>
              <Pressable
                style={styles.extensionsItem}
                onPress={() => {
                  handlePressExtensions("GARRET");
                }}
              >
                {benefit?.includes("GARRET") ? (
                  <Image source={require("../../assets/pressedGacXep.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedGacXep.png")} />
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnOverlay}>
          <Pressable
            style={{
              ...styles.btn,
              backgroundColor: "#fff",
              borderColor: "#ABB4BD",
            }}
          >
            <Text
              style={{
                ...styles.btnText,
                color: "#ABB4BD",
              }}
              onPress={() => {
                navigation.navigate("LEASER/home-page");
              }}
            >
              Hủy
            </Text>
          </Pressable>
          <Pressable
            style={{
              ...styles.btn,
              backgroundColor: "#2F80ED",
              borderColor: "#2F80ED",
            }}
            onPress={handlePress}
          >
            <Text
              style={{
                ...styles.btnText,
                color: "#fff",
              }}
            >
              Tiếp theo
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <LeaserNavigator navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    height: 500,
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
  roomInformation: {
    width: "100%",
    height: "auto",
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 5,
  },
  roomItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  roomInput: {
    width: "70%",
    height: 40,
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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
  },
  extensionsOverlay: {
    width: "100%",
  },
  extensions: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: 600,
  },
  extensionsItem: {
    width: 140,
    height: 40,
    marginBottom: 5,
  },
  btnOverlay: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    width: "40%",
    height: 40,
    borderWidth: 1,
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

const mapDispatchToProps = (dispatch) => {
  return {
    createNewRoom: (room) => dispatch(createNewRoomReducer(room)),
  };
};
export default connect(mapDispatchToProps)(AddHome);
