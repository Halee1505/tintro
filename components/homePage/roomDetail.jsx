import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import roomApi from "../../api/room";
import { useEffect, useState } from "react";
import moment from "moment";
import { Extension } from "../../model/room.js";
import { moneyFormatter } from "../../utils/moneyFormatter";
function RoomDetail({ navigation, route }) {
  const { roomId } = route.params;
  const [room, setRoom] = useState({});
  useEffect(() => {
    if (roomId) {
      roomApi.getRoomById(roomId).then((res) => {
        setRoom(res);
      });
    }
  }, [route]);
  return Object.keys(room).length > 0 ? (
    <ScrollView style={style.container}>
      <View
        style={{
          height: 250,
        }}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {room.mImageUrl?.map((url, index) => {
            return (
              <View
                key={index}
                style={{ width: Dimensions.get("window").width, height: 250 }}
              >
                <Image
                  source={{ uri: url }}
                  resizeMethod="scale"
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <Text style={style.roomName}>{room.mRoomName}</Text>
      <View
        style={{
          ...style.roomDetail,
        }}
      >
        <View
          style={{
            ...style.horizontal,
            marginBottom: 10,
          }}
        >
          <View style={style.textIconOverlay}>
            <Image
              source={require("../../assets/money.png")}
              resizeMethod="scale"
              resizeMode="contain"
              style={style.icon}
            />

            <Text
              style={{
                ...style.roomDetailText,
                color: "#3772FF",
              }}
            >
              {moneyFormatter(room.mRentPrice)}
            </Text>
          </View>
          <View style={style.textIconOverlay}>
            <Image
              source={require("../../assets/home.png")}
              resizeMethod="scale"
              resizeMode="contain"
              style={style.icon}
            />
            <Text style={style.roomDetailText}>{room.mArea}m2</Text>
          </View>
          <View style={style.textIconOverlay}>
            <Image
              source={require("../../assets/clock.png")}
              resizeMethod="scale"
              resizeMode="contain"
              style={style.icon}
            />
            <Text style={style.roomDetailText}>
              {moment(new Date() - new Date(room.mCreated)).format("HH:SS")}{" "}
              phút
            </Text>
          </View>
        </View>
        <View style={style.textIconOverlay}>
          <Image
            source={require("../../assets/location.png")}
            resizeMethod="scale"
            resizeMode="contain"
            style={style.icon}
          />
          <Text style={style.roomDetailText}>{room.mAddress}</Text>
        </View>
      </View>
      <View
        style={{
          ...style.roomDescription,
        }}
      >
        <Text
          style={{
            ...style.roomDetailText,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#3772FF",
          }}
        >
          Tiện ích phòng
        </Text>
        <View
          style={{
            ...style.horizontal,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {room.mExtension?.map((extension, index) => {
            if (extension) {
              const { mIcon, mCode, mName } = Extension[extension];
              if (mCode === "ELECTRIC") {
                return (
                  <View
                    key={mCode}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "25%",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      source={{
                        uri: mIcon,
                      }}
                      resizeMethod="scale"
                      resizeMode="contain"
                      style={style.extensionIcon}
                    />
                    <Text style={style.roomDetailText}>
                      {mName} {moneyFormatter(room.mElectricityPrice)}
                    </Text>
                  </View>
                );
              } else if (mCode === "WATER") {
                return (
                  <View
                    key={mCode}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "25%",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      source={{
                        uri: mIcon,
                      }}
                      resizeMethod="scale"
                      resizeMode="contain"
                      style={style.extensionIcon}
                    />
                    <Text style={style.roomDetailText}>
                      {mName} {moneyFormatter(room.mWaterPrice)}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={mCode}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "25%",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      source={{
                        uri: mIcon,
                      }}
                      resizeMethod="scale"
                      resizeMode="contain"
                      style={style.extensionIcon}
                    />
                    <Text style={style.roomDetailText}>{mName}</Text>
                  </View>
                );
              }
            }
          })}
        </View>
        <Text
          style={{
            ...style.roomDetailText,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 10,
            color: "#3772FF",
          }}
        >
          Mô tả chi tiết
        </Text>

        <Text style={style.roomDetailText}>{room.mDescription}</Text>
      </View>
    </ScrollView>
  ) : (
    <Text
      style={{
        fontSize: 14,
        width: "100%",
        textAlign: "center",
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      Đang tải...
    </Text>
  );
}
const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  extensionIcon: {
    width: 40,
    height: 40,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  textIconOverlay: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  roomName: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 10,
  },
  roomDetail: {
    width: "90%",
    height: "auto",
    marginTop: 10,
    padding: 10,
    marginLeft: "5%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  roomDescription: {
    width: "90%",
    height: "auto",
    marginTop: 10,
    marginLeft: "5%",
  },
  roomDetailText: {
    fontSize: 14,
  },
});
export default RoomDetail;
