import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import notificationApi from "../../api/notification";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import Navigator from "../navigator";

const Notification = ({ navigation }) => {
  const user = useSelector((state) => state.loginUserReducer);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user.user._id) return;
    setLoading(true);
    notificationApi.getNotificationByUserId(user.user._id).then((res) => {
      setNotifications(res ? res : []);
      setLoading(false);
    });
  }, [user]);
  return (
    <View style={styles.container}>
      <ScrollView
        vertical
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => {
          return (
            <View key={notification._id} style={styles.item}>
              <Icon name="paypal" size={40} color="#000" />
              <View
                style={{
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#3772FF",
                  }}
                >
                  Bạn có hóa đơn mới
                </Text>
                <Text>
                  Một hóa đơn
                  {notification.mType == "ROOM" ? " tiền nhà " : " điện nước "}
                  mới được tạo
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 4,
                  top: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name="clock-o" size={14} color="#3772FF" />
                <Text
                  style={{
                    color: "#3772FF",
                  }}
                >
                  {moment(new Date(notification.mCreated)).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Navigator navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 10,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    marginBottom: 10,
    width: "100%",
    position: "relative",
  },
  scrollView: {
    width: "100%",
    marginBottom: 70,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};

export default connect(mapStateToProps)(Notification);
