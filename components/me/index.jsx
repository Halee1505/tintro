import { Image, Pressable, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { LOGIN_USER } from "../../redux/const";

const Me = ({ navigation }) => {
  const user = useSelector((state) => state.loginUserReducer);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          borderColor: "#2F80ED",
          borderWidth: 5,
          borderBottomWidth: 1,
          borderRightWidth: 1,
          backgroundColor: "#fff",
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            width: "70%",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {user.user.mUserName}
          </Text>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {user.user.mPhoneNumber}
          </Text>
        </View>
        <Icon
          style={{
            marginRight: 10,
          }}
          name="user-circle"
          size={70}
          color="#2F80ED"
        />
      </View>
      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          borderColor: "#ABB4BD",
          width: "100%",
          borderWidth: 1,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 20,
        }}
        onPress={() => {
          dispatch({ type: LOGIN_USER, payload: {} });
          navigation.navigate("Home");
        }}
      >
        <Icon name="sign-out" color="black" size={40} />
        <Text
          style={{
            fontSize: 20,
            margin: 0,
            marginRight: 10,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Đăng xuất ứng dụng
        </Text>
        <Icon
          style={{
            marginLeft: "auto",
          }}
          name="chevron-right"
          color="black"
          size={20}
        />
      </Pressable>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUserReducer(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Me);
