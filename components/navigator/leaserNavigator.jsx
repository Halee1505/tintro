import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
function LeaserNavigator({ navigation }) {
  const user = useSelector((state) => state.loginUserReducer);
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={style.container}>
      <Pressable
        style={style.button}
        onPress={() =>
          navigation.navigate("LEASER/home-page", {
            load: Math.random(),
          })
        }
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
      <Pressable
        style={style.button}
        onPress={() => {
          navigation.navigate("LEASER/electricWater");
        }}
      >
        <Image
          source={require("../../assets/room.png")}
          style={{
            width: 25,
            height: 23,
          }}
        />
        <Text>Điện nước</Text>
      </Pressable>
      <Pressable
        style={style.button}
        onPress={() => {
          navigation.navigate("LEASER/bill");
        }}
      >
        <Image
          source={require("../../assets/bell.png")}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text>Hóa đơn</Text>
      </Pressable>
      <Pressable
        style={style.button}
        onPress={() => {
          navigation.navigate("me");
        }}
      >
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
const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};

export default connect(mapStateToProps)(LeaserNavigator);
