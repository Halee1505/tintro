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

function Login({ navigation }) {
  const [LoginData, setLoginData] = useState({
    phoneNumber: "",
    password: "",
    remember: false,
  });
  return (
    <View style={style.container}>
      <View style={style.logo}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 62, height: 62 }}
        />
        <Image
          source={require("../../assets/name.png")}
          style={{ width: 118, height: 48 }}
        />
      </View>
      <View
        style={{
          ...style.loginAnotherWayView,
          marginTop: 40,
          marginBottom: -10,
        }}
      >
        <Pressable onPress={() => console.log("facebook")}>
          <Image
            style={style.loginAnotherWayButton}
            source={require("../../assets/Facebook.png")}
          />
        </Pressable>
        <Pressable onPress={() => console.log("google")}>
          <Image
            style={style.loginAnotherWayButton}
            source={require("../../assets/Google.png")}
          />
        </Pressable>
      </View>
      <Text>Hoặc</Text>
      <View style={style.loginForm}>
        <TextInput
          style={style.loginFormInput}
          keyboardType="numeric"
          dataDetectorTypes={"phoneNumber"}
          onChangeText={(text) =>
            setLoginData({ ...LoginData, phoneNumber: text })
          }
          placeholder="Số điện thoại"
        />
        <TextInput
          style={style.loginFormInput}
          keyboardType="password"
          onChangeText={(text) =>
            setLoginData({ ...LoginData, password: text })
          }
          placeholder="Mật khẩu"
        />
      </View>
      <View style={style.loginAnotherWayView}>
        <View style={style.horizontal}>
          <CheckBox
            style={style.checkbox}
            color={LoginData.remember ? "#3772FF" : undefined}
            value={LoginData.remember}
            onValueChange={(newValue) =>
              setLoginData({ ...LoginData, remember: newValue })
            }
          />
          <Text>Lưu mật khẩu</Text>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate("forgot-password")}>
            <Text
              style={{
                color: "#3772FF",
              }}
            >
              Quên mật khẩu?
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={style.action}>
        <Pressable
          style={
            LoginData.phoneNumber.length > 0 && LoginData.password.length > 0
              ? style.LoginButtonPrimary
              : style.LoginButtonSecondary
          }
          onPress={() => navigation.navigate("login")}
        >
          <Text style={style.ButtonText}>Đăng nhập</Text>
        </Pressable>
      </View>
      <View
        style={{
          ...style.horizontal,
        }}
      >
        <Text
          style={{
            color: "#ABB4BD",
          }}
        >
          Chưa có tài khoản?{"  "}
        </Text>
        <Pressable onPress={() => navigation.navigate("register")}>
          <Text
            style={{
              color: "#3772FF",
            }}
          >
            Đăng ký ngay
          </Text>
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
  logo: {
    width: 118,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoImage: {
    width: 54,
    height: 54,
  },
  logoName: {
    width: 79,
    height: 32,
  },
  text: {
    width: 49,
    height: 16,
    alignSelf: "flex-start",
  },
  loginAnotherWayView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    height: 50,
  },
  loginAnotherWayButton: {
    width: 145,
    height: 50,
  },
  checkbox: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  loginForm: {},
  loginFormInput: {
    width: 300,
    height: 50,
    borderBottomColor: "#ABB4BD",
    borderBottomWidth: 1,
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

export default connect(mapStateToProps)(Login);