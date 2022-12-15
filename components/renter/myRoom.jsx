import { StyleSheet, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
const MyRoom = ({ navigation }) => {
  const user = useSelector((state) => state.loginUserReducer);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.overlay}
        onPress={() =>
          navigation.navigate("RENTER/my-room/manageRoom", {
            userId: user.user._id,
            load: Math.random(),
          })
        }
      >
        <Icon
          name="home"
          size={30}
          color="black"
          style={{
            marginHorizontal: 10,
          }}
        />
        <Text style={styles.text}>Quản lý phòng ở</Text>
        <Icon
          style={{
            marginLeft: "auto",
            marginRight: 10,
          }}
          name="chevron-right"
          color="black"
          size={30}
        />
      </Pressable>
      <Pressable
        style={styles.overlay}
        onPress={() => {
          navigation.navigate("RENTER/electricWater", {
            userId: user.user._id,
          });
        }}
      >
        <Icon
          name="shower"
          size={30}
          color="black"
          style={{
            marginHorizontal: 10,
          }}
        />
        <Text style={styles.text}>Thống kê điện nước</Text>
        <Icon
          style={{
            marginLeft: "auto",
            marginRight: 10,
          }}
          name="chevron-right"
          color="black"
          size={30}
        />
      </Pressable>
      <Pressable
        style={styles.overlay}
        onPress={() => {
          navigation.navigate("RENTER/my-room/manageBill", {
            userId: user.user._id,
          });
        }}
      >
        <Icon
          name="paypal"
          size={30}
          color="black"
          style={{
            marginHorizontal: 10,
          }}
        />
        <Text style={styles.text}>Quản lý hóa đơn</Text>
        <Icon
          style={{
            marginLeft: "auto",
            marginRight: 10,
          }}
          name="chevron-right"
          color="black"
          size={30}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  overlay: {
    width: "100%",
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ABB4BD",
    borderRadius: 8,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};

export default connect(mapStateToProps)(MyRoom);
