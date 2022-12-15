import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

function CheckMail({ route, navigation }) {
  return (
    <View style={style.container}>
      <Image
        source={require("../../assets/Mail.png")}
        style={style.MailImage}
      />
      <Text style={style.headerText}>Kiểm tra email của bạn</Text>

      <Text style={style.descriptionText}>
        Chúng tôi đã gửi mật khẩu vào email mà bạn đã đăng ký.{" "}
      </Text>
      <Pressable style={style.PressablePrimary} disabled={true}>
        <Text style={style.ButtonText}>Đi đến hộp thư</Text>
      </Pressable>
      <Pressable
        style={style.PressablePrimary}
        onPress={() =>
          navigation.navigate("new-password", {
            phoneNumberOrEmail: route.params.phoneNumberOrEmail,
          })
        }
      >
        <Text style={style.ButtonText}>Đặt lại mật khẩu</Text>
      </Pressable>
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

  MailImage: {
    width: 200.93,
    height: 149.81,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  descriptionText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    color: "#ABB4BD",
  },

  PressablePrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 314,
    height: 44,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#3772FF",
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

export default connect(mapStateToProps)(CheckMail);
