import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import fixRequestApi from "../../../api/fixRequest";

const FixRequest = ({ change, roomId, setShowFixRequest, setChange }) => {
  const [requestInfo, setRequestInfo] = useState({
    mTitle: "",
    mDescription: "",
    mRoomId: roomId,
    mStatus: "PENDING",
    mCreated: new Date(),
    mUpdated: new Date(),
  });

  const createFixRequest = () => {
    Alert.alert("Thông báo", "Tạo yêu cầu?", [
      {
        text: "Hủy",
        onPress: () => {},
      },
      {
        text: "Đồng ý",
        onPress: () => {
          fixRequestApi
            .createFixRequest(requestInfo)
            .then((res) => {
              Alert.alert("Thông báo", "Tạo yêu cầu thành công", [
                {
                  text: "OK",
                  onPress: () => {
                    setChange(!change);
                    setShowFixRequest(false);
                  },
                },
              ]);
            })
            .catch((err) => {
              Alert.alert("Thông báo", "Tạo yêu cầu thất bại");
            });
        },
      },
    ]);
  };
  return (
    <Pressable
      style={styles.overlay}
      onPress={() => {
        setShowFixRequest(false);
      }}
    >
      <View style={styles.contain}>
        <Text style={styles.roomExtensionTitle}>Tạo yêu cầu sửa chữa</Text>
        <View>
          <View style={styles.roomItem}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginVertical: 5,
              }}
            >
              Tiêu đề
            </Text>
            <TextInput
              multiline={true}
              placeholder="Nhập tiêu đề"
              numberOfLines={2}
              style={styles.roomInput}
              value={requestInfo.mTitle}
              onChangeText={(text) => {
                setRequestInfo({ ...requestInfo, mTitle: text });
              }}
            />
          </View>
          <View style={styles.roomItem}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginVertical: 5,
              }}
            >
              Mô tả chi tiết
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={6}
              placeholder="Nhập mô tả"
              style={styles.roomInput}
              value={requestInfo.mDescription}
              onChangeText={(text) => {
                setRequestInfo({ ...requestInfo, mDescription: text });
              }}
            />
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
            onPress={createFixRequest}
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
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 10,
    paddingHorizontal: 10,
    zIndex: 100,
  },
  contain: {
    width: "100%",
    height: 390,
    backgroundColor: "#fff",
    marginTop: 100,
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
export default FixRequest;
