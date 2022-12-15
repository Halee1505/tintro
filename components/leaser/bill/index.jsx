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
import roomApi from "../../../api/room";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
function Bill({ navigation }) {
  const user = useSelector((state) => state.loginUserReducer);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user.user) {
      roomApi.getRoomByLeaserId(user.user._id).then((res) => {
        setRooms(res);
        setLoading(false);
      });
    }
  }, [user]);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
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
                navigation.navigate("LEASER/bill/detail", {
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
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
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

export default connect(mapStateToProps)(Bill);
