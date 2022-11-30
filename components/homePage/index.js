import { connect } from "react-redux";
import { View, StyleSheet, BackHandler } from "react-native";
import Header from "../header";
import Navigator from "../navigator";
import Filter from "./filter";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { SHOW_FILTER } from "../../redux/const";

function HomePage({ navigation }) {
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
