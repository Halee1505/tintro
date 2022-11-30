import { connect } from "react-redux";
import { StyleSheet, View, TextInput, Pressable, Image } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SHOW_FILTER } from "../../redux/const";

function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  return (
    <View style={style.container}>
      <TextInput
        value={search}
        onChangeText={(value) => setSearch(value)}
        placeholder="Tìm kiếm"
        style={style.search}
      />
      <Pressable
        style={style.settingButton}
        onPress={() => {
          dispatch({
            type: SHOW_FILTER,
            payload: true,
          });
        }}
      >
        <Image source={require("../../assets/setting.png")} />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 60,

    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    position: "absolute",
    top: 0,
  },
  search: {
    width: "75%",
    marginLeft: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    height: 40,
    borderRadius: 8,
    fontSize: 16,
  },
  settingButton: {
    backgroundColor: "#3772FF",
    width: 40,
    height: 40,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowFilter: (value) => dispatch(showFilterReducer(value)),
  };
};
export default connect(mapDispatchToProps)(Header);
