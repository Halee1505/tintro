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

function NewPassword({ navigation }) {
  const [NewPassword, setNewPassword] = useState({
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleSend = () => {
    if (NewPassword.phoneNumberOrEmail != "") {
      navigation.navigate("Check-mail");
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.headerText}>Đặt lại mật khẩu</Text>
      <Text style={style.descriptionText}>
        Vui lòng đặt lại mật khẩu và xác nhận mật khẩu mới
      </Text>
      <View style={style.loginForm}>
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
            NewPassword.NewPassword.length > 0 &&
            NewPassword.ConfirmPassword.length > 0
              ? style.LoginButtonPrimary
              : style.LoginButtonSecondary
          }
          onPress={handleSend}
        >
          <Text style={style.ButtonText}>Cập nhật</Text>
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

export default connect(mapStateToProps)(NewPassword);
