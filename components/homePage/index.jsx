import { connect } from "react-redux";
import { View, StyleSheet, BackHandler, ScrollView, Text } from "react-native";
import Header from "../header";
import Navigator from "../navigator";
import Filter from "./filter";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SHOW_FILTER } from "../../redux/const";
import roomApi from "../../api/room";
import RoomItem from "./roomItem";

function HomePage({ navigation }) {
  const [roomsList, setRoomsList] = useState([]);
  useEffect(() => {
    roomApi.getRooms().then((res) => {
      setRoomsList(res);
    });
  }, []);
  const dispatch = useDispatch();
  const isShowFilter = useSelector(
    (state) => state.showFilterReducer.isShowFilter
  );

  useEffect(() => {
    const backAction = () => {
      if (isShowFilter) {
        dispatch({ type: SHOW_FILTER, payload: false });
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isShowFilter]);

  return (
    <View style={style.container}>
      <Header />
      <ScrollView vertical style={style.scrollView}>
        <View style={style.content}>
          {roomsList.length > 0 ? (
            roomsList?.map((room) => {
              return (
                <RoomItem key={room.mId} room={room} navigation={navigation} />
              );
            })
          ) : (
            <Text
              style={{
                fontSize: 14,
                width: "100%",
                textAlign: "center",
              }}
            >
              Đang tải...
            </Text>
          )}
        </View>
      </ScrollView>
      <Navigator navigation={navigation} />
      {isShowFilter ? <Filter /> : null}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  scrollView: {
    width: "100%",
    position: "absolute",
    top: 60,
    bottom: 60,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  header: {},
});

const mapStateToProps = (state) => {
  return {
    isShowFilter: state.showFilterReducer.isShowFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowFilter: (value) => dispatch(showFilterReducer(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);