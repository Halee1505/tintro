import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { connect } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";

function Otp({ navigation }) {
  const phoneNumber = useSelector(
    (state) => state.registerPhoneReducer.phoneNumber
  );
  const [otp, setOtp] = useState({
    otp: "",
  });

  const handleSend = () => {
    if (otp.otp != "") {
      navigation.navigate("otp");
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.headerText}>
        Nhập mã OTP gồm 4 chữ số được gửi tới {phoneNumber}
      </Text>

      <TextInput
        style={style.loginFormInput}
        onChangeText={(text) => setOtp({ ...otp, otp: text })}
        placeholder="Mã OTP"
      />

      <View style={style.action}>
        <Pressable
          style={
            otp.otp.length > 0
              ? style.LoginButtonPrimary
              : style.LoginButtonSecondary
          }
          onPress={handleSend}
        >
          <Text style={style.ButtonText}>Xác nhận</Text>
        </Pressable>
      </View>
      <View
        style={{
          ...style.vertical,
        }}
      >
        <Text
          style={{
            color: "#ABB4BD",
          }}
        >
          Bạn chưa nhận được mã OTP?
        </Text>
        <View
          style={{
            ...style.horizontal,
          }}
        >
          <Pressable onPress={() => navigation.navigate("register")}>
            <Text
              style={{
                color: "#3772FF",
              }}
            >
              Gửi lại mã
            </Text>
          </Pressable>
          <Text> | </Text>
          <Pressable onPress={() => navigation.navigate("register")}>
            <Text
              style={{
                color: "#3772FF",
              }}
            >
              Đổi số điện thoại
            </Text>
          </Pressable>
        </View>
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
    fontSize: 20,
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
    phoneNumber: state.registerPhoneReducer.phoneNumber,
  };
};

export default connect(mapStateToProps)(Otp);
