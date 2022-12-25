import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import roomApi from "../../api/room";
import { useSelector } from "react-redux";

const AddHomeNext = ({ route, navigation }) => {
  const user = useSelector((state) => state.loginUserReducer);
  const [roomInfo, setRoomInfo] = useState(JSON.parse(route.params.roomInfo));
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!data.canceled) {
      setImage(data.assets);
    }
  };

  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "tintro");
      formData.append("cloud_name", "dwlazmmpj");

      fetch("https://api.cloudinary.com/v1_1/dwlazmmpj/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data.url);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    });
  };

  const handleUpload = () => {
    setLoading(true);
    Promise.all(
      image.map((item) =>
        uploadImage({
          uri: item.uri,
          type: `test/${item.uri.split(".")[1]}`,
          name: `test.${item.uri.split(".")[1]}`,
        })
      )
    ).then((res) => {
      console.log(res);
      roomApi
        .createRoom({
          ...roomInfo,
          mImageUrl: res,
          mCurPeople: 0,
          mLeaserId: user.user._id,
          mStatus: "AVAILABLE",
          mCreated: new Date(),
          mUpdated: new Date(),
          mClosingDate: new Date(roomInfo.mClosingDate),
        })
        .then((res) => {
          setLoading(false);
          Alert.alert("Thông báo", "Tạo phòng thành công");
          navigation.navigate("LEASER/home-page", {
            load: Math.random(),
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          Alert.alert("Thông báo", "Tạo phòng thất bại");
        });
    });
  };

  return (
    <View style={styles.content}>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 10,
            zIndex: 100,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.roomInformation}>
        <Text style={styles.roomExtensionTitle}>Mô tả phòng</Text>
        <ScrollView
          vertical={true}
          showsVerticalScrollIndicator={false}
          style={styles.extensionsOverlay}
        >
          <View>
            <View style={styles.roomItem}>
              <Text>Tiêu đề</Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                style={styles.roomInput}
                onChangeText={(text) => {
                  setRoomInfo({ ...roomInfo, mTitle: text });
                }}
              />
            </View>
            <View style={styles.roomItem}>
              <Text>Mô tả chi tiết</Text>
              <TextInput
                multiline={true}
                numberOfLines={8}
                style={styles.roomInput}
                onChangeText={(text) => {
                  setRoomInfo({ ...roomInfo, mDescription: text });
                }}
              />
            </View>
            <View style={styles.roomItem}>
              <Text>Hình ảnh</Text>
              <View
                style={{
                  ...styles.roomInput,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {image?.map((item) => {
                  return (
                    <Image
                      key={item.uri}
                      source={{ uri: item.uri }}
                      style={{
                        width: 60,
                        height: 60,
                      }}
                    />
                  );
                })}
                <Pressable
                  style={{
                    width: 60,
                    height: 60,
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#ABB4BD",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={pickImage}
                >
                  <Icon name="camera" size={20} color="#ABB4BD" />
                </Pressable>
              </View>
            </View>
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
          onPress={handleUpload}
        >
          <Text
            style={{
              ...styles.btnText,
              color: "#fff",
            }}
          >
            Thêm phòng
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    height: 500,
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

const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};

export default connect(mapStateToProps)(AddHomeNext);
