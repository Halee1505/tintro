import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import CheckBox from "expo-checkbox";
import { useState } from "react";

function ForgotPassWord({ navigation }) {
  const [forgetData, setForgotData] = useState({
    phoneNumberOrEmail: "",
  });

  const handleSend = () => {
    if (forgetData.phoneNumberOrEmail != "") {
      navigation.navigate("Check-mail");
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.headerText}>Quên mật khẩu</Text>
      <Text style={style.descriptionText}>
        Vui lòng điền email hoặc số điện thoại đã đăng ký để lấy lại mật khẩu
      </Text>
      <View style={style.loginForm}>
        <TextInput
          style={style.loginFormInput}
          onChangeText={(text) =>
            setForgotData({ ...forgetData, phoneNumberOrEmail: text })
          }
          placeholder="Email / Số điện thoại"
        />
      </View>

      <View style={style.action}>
        <Pressable
          style={
            forgetData.phoneNumberOrEmail.length > 0
              ? style.LoginButtonPrimary
              : style.LoginButtonSecondary
          }
          onPress={handleSend}
        >
          <Text style={style.ButtonText}>Lấy lại mật khẩu</Text>
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
    padding: 20,
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "##000",
    justifySelf: "flex-start",
    width: "100%",
  },
  descriptionText: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 14,
    color: "#ABB4BD",
  },

  loginForm: {},
  loginFormInput: {
    width: 300,
    height: 50,
    borderBottomColor: "#ABB4BD",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  LoginButtonPrimary: {
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
  LoginButtonSecondary: {
    display: "flex",
    marginTop: 6,
    marginBottom: 6,

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

export default connect(mapStateToProps)(ForgotPassWord);
