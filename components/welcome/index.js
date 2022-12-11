import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { USER_ROLE } from "../../redux/const";

function Welcome({ navigation }) {
  const change = useSelector((state) => state.eventChangeReducer.change);
  const dispatch = useDispatch();
  return (
    <View style={style.container}>
      <View style={style.logo}>
        <Image
          source={require("../../assets/logo.png")}
          style={style.logoImage}
        />
        <Image
          source={require("../../assets/name.png")}
          style={style.logoName}
        />
      </View>

      <View style={style.action}>
        <Text style={style.text}>Bạn là:</Text>
        <Pressable
          style={style.PressablePrimary}
          onPress={() => {
            dispatch({ type: USER_ROLE, payload: "RENTER" });
            navigation.navigate("login");
          }}
        >
          <Text style={style.ButtonText}>Người tìm trọ</Text>
        </Pressable>
        <Pressable
          style={style.PressableSecondary}
          onPress={() => {
            dispatch({
              type: USER_ROLE,
              payload: "LEASER",
            });
            navigation.navigate("login");
          }}
        >
          <Text style={style.ButtonText}>Người cho thuê</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 118,
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 62,
    height: 62,
  },
  logoName: {
    width: 118,
    height: 48,
  },
  text: {
    width: 49,
    height: 20,
    alignSelf: "flex-start",
  },
  action: {
    width: 314,
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  PressablePrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 314,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#3772FF",
    marginTop: 6,
    marginBottom: 6,
  },
  PressableSecondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 314,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#ABB4BD",
  },
  ButtonText: {
    fontSize: 14,
    color: "#fff",
  },
});
const mapStateToProps = (state) => {
  return {
    change: state.eventChangeReducer.change,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserRole: (role) => dispatch(userRoleReducer(role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
