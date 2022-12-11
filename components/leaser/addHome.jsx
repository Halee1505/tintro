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
import DatePicker from "react-native-date-picker";
import Navigator from "../navigator";

const AddHome = ({ navigation }) => {
  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    numberOfPeople: "",
    area: "",
    rentPrice: "",
    electricityPrice: "",
    waterPrice: "",
    closingDate: new Date(),
    address: "",
  });
  const [benefit, setBenefit] = useState([]);
  function handlePressExtensions(bf) {
    if (benefit.includes(bf)) {
      setBenefit((benefit) => benefit.filter((item) => item !== bf));
    } else {
      setBenefit((benefit) => [...benefit, bf]);
    }
  }
  return (
    // <View style={styles.container}>
    //   <ScrollView
    //     vertical
    //     style={styles.ScrollView}
    //     showsVerticalScrollIndicator={false}
    //   >
    <View style={styles.content}>
      <View style={styles.roomInformation}>
        <View style={styles.roomItem}>
          <Text>Tên phòng trọ</Text>
          <TextInput
            style={styles.roomInput}
            placeholder="Ví dụ: Phòng trọ 1"
            onChangeText={(text) => {
              setRoomInfo((roomInfo) => ({ ...roomInfo, roomName: text }));
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
                numberOfPeople: text,
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
              setRoomInfo((roomInfo) => ({ ...roomInfo, area: text }));
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
              setRoomInfo((roomInfo) => ({ ...roomInfo, rentPrice: text }));
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
                electricityPrice: text,
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
                waterPrice: text,
              }));
            }}
          />
        </View>
        <View style={styles.roomItem}>
          <Text>Ngày chốt sổ</Text>
          <Pressable style={styles.roomInput}>
            <Text>
              {roomInfo.closingDate.toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            {/* <DatePicker
              date={roomInfo.closingDate}
              onDateChange={(date) => {
                setRoomInfo((roomInfo) => ({
                  ...roomInfo,
                  closingDate: date,
                }));
              }}
              mode="date"
              locale="vi"
              textColor="black"
            /> */}
          </Pressable>
        </View>
        <View style={styles.roomItem}>
          <Text>Địa chỉ</Text>
          <TextInput
            style={styles.roomInput}
            placeholder="159/5, Bình Thắng, Dĩ An"
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
                handlePressExtensions("mayLanh");
              }}
            >
              {benefit?.includes("mayLanh") ? (
                <Image source={require("../../assets/pressedMayLanh.png")} />
              ) : (
                <Image source={require("../../assets/unPressedMayLanh.png")} />
              )}
            </Pressable>
            <Pressable
              style={styles.extensionsItem}
              onPress={() => {
                handlePressExtensions("tuLanh");
              }}
            >
              {benefit?.includes("tuLanh") ? (
                <Image source={require("../../assets/pressedTuLanh.png")} />
              ) : (
                <Image source={require("../../assets/unPressedTuLanh.png")} />
              )}
            </Pressable>
            <Pressable
              style={styles.extensionsItem}
              onPress={() => {
                handlePressExtensions("mayGiat");
              }}
            >
              {benefit?.includes("mayGiat") ? (
                <Image source={require("../../assets/pressedMayGiat.png")} />
              ) : (
                <Image source={require("../../assets/unPressedMayGiat.png")} />
              )}
            </Pressable>
            <Pressable
              style={styles.extensionsItem}
              onPress={() => {
                handlePressExtensions("nhaBep");
              }}
            >
              {benefit?.includes("nhaBep") ? (
                <Image source={require("../../assets/pressedNhaBep.png")} />
              ) : (
                <Image source={require("../../assets/unPressedNhaBep.png")} />
              )}
            </Pressable>
            <Pressable
              style={styles.extensionsItem}
              onPress={() => {
                handlePressExtensions("tuDo");
              }}
            >
              {benefit?.includes("tuDo") ? (
                <Image source={require("../../assets/pressedTuDo.png")} />
              ) : (
                <Image source={require("../../assets/unPressedTuDo.png")} />
              )}
            </Pressable>
            <Pressable
              style={styles.extensionsItem}
              onPress={() => {
                handlePressExtensions("choDeXe");
              }}
            >
              {benefit?.includes("choDeXe") ? (
                <Image source={require("../../assets/pressedChoDeXe.png")} />
              ) : (
                <Image source={require("../../assets/unPressedChoDeXe.png")} />
              )}
            </Pressable>
            <Pressable
              style={styles.extensionsItem}
              onPress={() => {
                handlePressExtensions("wifi");
              }}
            >
              {benefit?.includes("wifi") ? (
                <Image source={require("../../assets/pressedWifi.png")} />
              ) : (
                <Image source={require("../../assets/unPressedWifi.png")} />
              )}
            </Pressable>
            <Pressable
              style={styles.extensionsItem}
              onPress={() => {
                handlePressExtensions("gacXep");
              }}
            >
              {benefit?.includes("gacXep") ? (
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
          onPress={() => {
            navigation.navigate("LEASER/add-home/next");
          }}
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
      <Navigator navigation={navigation} />
    </View>
    // </ScrollView>
    //</View>
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
    width: "94%",
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
export default AddHome;
