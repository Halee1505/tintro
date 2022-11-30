import { connect } from "react-redux";

import { StyleSheet, View, Image, Text, Pressable } from "react-native";

function Navigator({ navigation }) {
  return (
    <View style={style.container}>
      <Pressable
        style={style.button}
        onPress={() => navigation.navigate("home-page")}
      >
        <Image
          source={require("../../assets/home.png")}
          style={{
            width: 24.46,
            height: 24,
          }}
        />
        <Text>Trang chủ</Text>
      </Pressable>
      <Pressable style={style.button}>
        <Image
          source={require("../../assets/room.png")}
          style={{
            width: 25,
            height: 23,
          }}
        />
        <Text>Phòng tôi</Text>
      </Pressable>
      <Pressable style={style.button}>
        <Image
          source={require("../../assets/bell.png")}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text>Thông báo</Text>
      </Pressable>
      <Pressable style={style.button}>
        <Image
          source={require("../../assets/user.png")}
          style={{
            width: 23.67,
            height: 24,
          }}
        />
        <Text>Tôi</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    position: "absolute",
    bottom: 0,
  },
  image: {
    width: 2,
    height: 25,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 80,
    borderRadius: 8,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
});

export default connect()(Navigator);
