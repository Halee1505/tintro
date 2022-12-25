import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";

import { moneyFormatter } from "../../utils/moneyFormatter";
function RoomItem({ room, navigation }) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate("room-detail", { roomId: room._id });
      }}
    >
      <Image
        source={{
          uri: room.mImageUrl[0],
        }}
        style={styles.image}
      />
      <Text style={styles.price}>{moneyFormatter(room.mRentPrice)}</Text>
      <Text style={styles.title}>{room.mRoomName}</Text>
      <View
        style={{
          ...styles.horizontal,
          justifyContent: "flex-start",
          marginLeft: 10,
          marginTop: 3,
          alignItems: "center",
        }}
      >
        <Icon name="globe" size={14} color="black" />

        <Text style={styles.address}>{room.mAddress}</Text>
      </View>
      <View
        style={{
          ...styles.horizontal,
          justifyContent: "space-around",
          marginLeft: 10,
          marginTop: 3,
        }}
      >
        <View
          style={{
            ...styles.horizontal,
            alignItems: "center",
          }}
        >
          <Icon name="home" size={14} color="black" />

          <Text style={styles.area}>{room.mArea}m2</Text>
        </View>
        <View
          style={{
            ...styles.horizontal,
            alignItems: "center",
          }}
        >
          <Icon name="clock-o" size={14} color="black" />

          <Text style={styles.postTime}>
            {moment(new Date() - new Date(room.mCreated)).format("HH:SS")} phút
            trước
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 2,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 176,
    height: 95,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#3772FF",
    paddingLeft: 10,
    height: 20,
    width: 100,
    marginTop: -20,
    borderBottomLeftRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
  },
  address: {
    fontSize: 16,
    marginLeft: 5,
  },
  area: {
    fontSize: 12,
    marginLeft: 5,
  },
  postTime: {
    fontSize: 12,
    marginLeft: 5,
  },
  locationIcon: {
    width: 9.1,
    height: 15,
    marginRight: 5,
  },
  homeIcon: {
    width: 13.1,
    marginRight: 5,
    height: 14,
  },
  clockIcon: {
    width: 15,
    marginRight: 5,
    height: 16,
  },
});

export default RoomItem;
