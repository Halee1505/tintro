import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import LeaserNavigator from "../navigator/leaserNavigator";
import roomApi from "../../api/room";
import { useEffect, useState } from "react";
import { moneyFormatter } from "../../utils/moneyFormatter";
import Icon from "react-native-vector-icons/FontAwesome";
function LeaserHomePage({ navigation }) {
  const user = useSelector((state) => state.loginUserReducer);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (user.user) {
      roomApi.getRoomByLeaserId(user.user._id).then((res) => {
        setRooms(res);
        setLoading(false);
      });
    }
  }, [user, reload]);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.roomItem,
          flexDirection: "row",
          justifyContent: "flex-start",
          marginTop: 0,
        }}
      >
        <Icon name="file-text" size={40} color="black" />
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Phòng đang cho thuê:{" "}
            {rooms.filter((item) => item.mStatus == "RENTED").length}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#2F80ED",
            }}
          >
            Số người đang thuê:{" "}
            {rooms.reduce((total, cur) => {
              if (cur.mStatus !== "AVAILABLE") {
                total += cur.mCurPeople;
              }
              return total;
            }, 0)}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{
          width: "100%",
          marginBottom: 70,
        }}
        showsVerticalScrollIndicator={false}
      >
        {rooms.map((room) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("LEASER/home-page/detail", {
                  id: room._id,
                });
              }}
              key={room._id}
              style={{
                ...styles.roomItem,
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor:
                  room.mStatus == "RENTED"
                    ? "green"
                    : room.mStatus == "AVAILABLE"
                    ? "#2F80ED"
                    : "red",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="home" size={50} color="black" />
                <View
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {room.mRoomName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#2F80ED",
                    }}
                  >
                    {moneyFormatter(room.mRentPrice)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 50,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    alignSelf: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Icon name="user" size={16} color="#2F80ED" />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#2F80ED",
                      marginLeft: 5,
                    }}
                  >
                    {room.mCurPeople}/{room.mMaxPeople}
                  </Text>
                </View>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    color:
                      room.mStatus == "RENTED"
                        ? "green"
                        : room.mStatus == "AVAILABLE"
                        ? "#2F80ED"
                        : "red",
                  }}
                >
                  {room.mStatus == "RENTED"
                    ? "Đang cho thuê"
                    : room.mStatus == "AVAILABLE"
                    ? "Còn trống"
                    : "Yêu cầu trả phòng"}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <Pressable
        onPress={() => {
          setReload(!reload);
        }}
        style={styles.loadOverlay}
      >
        <Icon name="refresh" size={30} color="white" />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("LEASER/add-home");
        }}
        style={styles.addOverlay}
      >
        <Text style={styles.addContent}>+</Text>
      </Pressable>
      <LeaserNavigator navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  roomItem: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "#ABB4BD",
    borderWidth: 5,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    backgroundColor: "#fff",
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadOverlay: {
    position: "absolute",
    bottom: 80,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
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

const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};

export default connect(mapStateToProps)(LeaserHomePage);
