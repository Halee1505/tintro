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
import { useDispatch } from "react-redux";
import { REGISTER_PHONE_NUMBER } from "../../redux/const";
function Register({ navigation }) {
  const dispatch = useDispatch();
  const [NewPassword, setNewPassword] = useState({
    username: "",
    email: "",
    phone: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleSend = () => {
    if (
      NewPassword.username !== "" &&
      NewPassword.email !== "" &&
      NewPassword.phone !== "" &&
      NewPassword.NewPassword !== "" &&
      NewPassword.ConfirmPassword !== ""
    ) {
      if (NewPassword.NewPassword === NewPassword.ConfirmPassword) {
        dispatch({
          type: REGISTER_PHONE_NUMBER,
          payload: NewPassword.phone,
        });
        navigation.navigate("otp");
      }
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.headerText}>Đăng ký</Text>

      <View style={style.loginForm}>
        <TextInput
          style={style.loginFormInput}
          onChangeText={(text) =>
            setNewPassword({ ...NewPassword, username: text })
          }
          placeholder="Họ & tên"
        />
        <TextInput
          style={style.loginFormInput}
          onChangeText={(text) =>
            setNewPassword({ ...NewPassword, email: text })
          }
          placeholder="Email"
        />
        <TextInput
          style={style.loginFormInput}
          onChangeText={(text) =>
            setNewPassword({ ...NewPassword, phone: text })
          }
          placeholder="Số điện thoại"
        />
        <TextInput
          style={style.loginFormInput}
          onChangeText={(text) =>
            setNewPassword({ ...NewPassword, NewPassword: text })
          }
          placeholder="Mật khẩu mới"
        />
        <TextInput
          style={style.loginFormInput}
          onChangeText={(text) =>
            setNewPassword({ ...NewPassword, ConfirmPassword: text })
          }
          placeholder="Xác nhận mật khẩu"
        />
      </View>

      <View style={style.action}>
        <Pressable
          style={
            NewPassword.username.length > 0 &&
            NewPassword.email.length > 0 &&
            NewPassword.phone.length > 0 &&
            NewPassword.NewPassword.length > 0 &&
            NewPassword.ConfirmPassword.length > 0
              ? style.LoginButtonPrimary
              : style.LoginButtonSecondary
          }
          onPress={handleSend}
        >
          <Text style={style.ButtonText}>Đăng ký</Text>
        </Pressable>
      </View>
      <View
        style={{
          ...style.horizontal,
          alignSelf: "flex-end",
          justifySelf: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            color: "#ABB4BD",
          }}
        >
          Bằng việc đăng ký, bạn đồng ý với{" "}
        </Text>
        <Pressable onPress={() => navigation.navigate("register")}>
          <Text
            style={{
              color: "#3772FF",
            }}
          >
            Điều khoản & Điều kiện
          </Text>
        </Pressable>
        <Text> và </Text>
        <Pressable onPress={() => navigation.navigate("register")}>
          <Text
            style={{
              color: "#3772FF",
            }}
          >
            Chính sách Bảo mật{" "}
          </Text>
        </Pressable>
        <Text>của Tintro</Text>
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

const mapDispatchToProps = (dispatch) => {
  return {
    registerPhoneNumber: (phoneNumber) =>
      dispatch(registerPhoneReducer(phoneNumber)),
  };
};

export default connect(mapDispatchToProps)(Register);
