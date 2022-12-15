import { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import BillDetailAll from "../../all/billDetail";
import roomApi from "../../../api/room";
const ManageBill = ({ navigation, route }) => {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (route.params.userId) {
      setLoading(true);
      roomApi
        .getRoomByRenterId(route.params.userId)
        .then((res) => {
          if (res) {
            console.log("2");
            setRoom(res);
            setLoading(false);
          } else {
            console.log("3");
            setLoading(false);
            Alert.alert("Thông báo", "Bạn chưa có phòng nào");
            navigation.navigate("RENTER/my-room");
          }
        })
        .catch((err) => {
          console.log("4");
          setLoading(false);
        });
    }
  }, [route.params.userId]);
  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <BillDetailAll editable={false} roomId={room._id} navigation={navigation} />
  );
};

export default ManageBill;
