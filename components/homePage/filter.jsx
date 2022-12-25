import { connect } from "react-redux";
import Slider from "@react-native-community/slider";

import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_FILTER, SET_FILTER_VALUE } from "../../redux/const";
import { useState } from "react";
import { moneyFormatter } from "../../utils/moneyFormatter";
function Filter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(
    (state) => state.filterValueReducer.filterValue
  );

  function handlePressExtensions(benefit) {
    if (filterValue.benefit.includes(benefit)) {
      dispatch({
        type: SET_FILTER_VALUE,
        payload: {
          ...filterValue,
          benefit: filterValue.benefit.filter((item) => item !== benefit),
        },
      });
    } else {
      dispatch({
        type: SET_FILTER_VALUE,
        payload: {
          ...filterValue,
          benefit: [...filterValue.benefit, benefit],
        },
      });
    }
  }

  return (
    <Pressable
      style={style.overlay}
      onPress={() =>
        dispatch({
          type: SHOW_FILTER,
          payload: false,
        })
      }
    >
      <Pressable style={style.container} onPress={(e) => e.stopPropagation()}>
        <View style={style.filterOverlay}>
          <Text style={style.text}>
            Giá từ: {moneyFormatter(filterValue.fromPrice)}
          </Text>
          <View>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={20000000}
              minimumTrackTintColor="#3772FF"
              thumbTintColor="#3772FF"
              step={100000}
              maximumTrackTintColor="#000000"
              onValueChange={(value) =>
                dispatch({
                  type: SET_FILTER_VALUE,
                  payload: { ...filterValue, fromPrice: value },
                })
              }
            />
          </View>
          <Text style={style.text}>
            Đến: {moneyFormatter(filterValue.toPrice)}
          </Text>
          <View>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={20000000}
              minimumTrackTintColor="#3772FF"
              thumbTintColor="#3772FF"
              step={100000}
              maximumTrackTintColor="#000000"
              onValueChange={(value) =>
                dispatch({
                  type: SET_FILTER_VALUE,
                  payload: { ...filterValue, toPrice: value },
                })
              }
              inverted
            />
          </View>
          <Text style={style.text}>Tiện ích</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={style.extensionsOverlay}
          >
            <View style={{ ...style.extensions, height: 90 }}>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("mayLanh");
                }}
              >
                {filterValue.benefit?.includes("mayLanh") ? (
                  <Image source={require("../../assets/pressedMayLanh.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedMayLanh.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("tuLanh");
                }}
              >
                {filterValue.benefit?.includes("tuLanh") ? (
                  <Image source={require("../../assets/pressedTuLanh.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedTuLanh.png")} />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("mayGiat");
                }}
              >
                {filterValue.benefit?.includes("mayGiat") ? (
                  <Image source={require("../../assets/pressedMayGiat.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedMayGiat.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("nhaBep");
                }}
              >
                {filterValue.benefit?.includes("nhaBep") ? (
                  <Image source={require("../../assets/pressedNhaBep.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedNhaBep.png")} />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("tuDo");
                }}
              >
                {filterValue.benefit?.includes("tuDo") ? (
                  <Image source={require("../../assets/pressedTuDo.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedTuDo.png")} />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("choDeXe");
                }}
              >
                {filterValue.benefit?.includes("choDeXe") ? (
                  <Image source={require("../../assets/pressedChoDeXe.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedChoDeXe.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("wifi");
                }}
              >
                {filterValue.benefit?.includes("wifi") ? (
                  <Image source={require("../../assets/pressedWifi.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedWifi.png")} />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() => {
                  handlePressExtensions("gacXep");
                }}
              >
                {filterValue.benefit?.includes("gacXep") ? (
                  <Image source={require("../../assets/pressedGacXep.png")} />
                ) : (
                  <Image source={require("../../assets/unPressedGacXep.png")} />
                )}
              </Pressable>
            </View>
          </ScrollView>
          <Text style={style.text}>Sắp xếp theo</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={style.extensionsOverlay}
          >
            <View style={{ ...style.extensions, height: 50 }}>
              <Pressable
                style={style.extensionsItem}
                onPress={() =>
                  dispatch({
                    type: SET_FILTER_VALUE,
                    payload: { ...filterValue, sort: "nearest" },
                  })
                }
              >
                {filterValue.sort === "nearest" ? (
                  <Image source={require("../../assets/pressedLienQuan.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedLienQuan.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() =>
                  dispatch({
                    type: SET_FILTER_VALUE,
                    payload: { ...filterValue, sort: "latest" },
                  })
                }
              >
                {filterValue.sort === "latest" ? (
                  <Image source={require("../../assets/pressedMoiNhat.png")} />
                ) : (
                  <Image
                    source={require("../../assets/unPressedMoiNhat.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() =>
                  dispatch({
                    type: SET_FILTER_VALUE,
                    payload: { ...filterValue, sort: "lowFirst" },
                  })
                }
              >
                {filterValue.sort === "lowFirst" ? (
                  <Image
                    source={require("../../assets/pressedThapDenCao.png")}
                  />
                ) : (
                  <Image
                    source={require("../../assets/unPressedThapDenCao.png")}
                  />
                )}
              </Pressable>
              <Pressable
                style={style.extensionsItem}
                onPress={() =>
                  dispatch({
                    type: SET_FILTER_VALUE,
                    payload: { ...filterValue, sort: "highFirst" },
                  })
                }
              >
                {filterValue.sort === "highFirst" ? (
                  <Image
                    source={require("../../assets/pressedCaoDenThap.png")}
                  />
                ) : (
                  <Image
                    source={require("../../assets/unPressedCaoDenThap.png")}
                  />
                )}
              </Pressable>
            </View>
          </ScrollView>
          <View style={style.buttonOverlay}>
            <Pressable
              style={style.buttonSecondary}
              onPress={() =>
                dispatch({
                  type: SHOW_FILTER,
                  payload: false,
                })
              }
            >
              <Text style={style.ButtonText}>Hủy</Text>
            </Pressable>
            <Pressable
              style={style.buttonPrimary}
              onPress={() => {
                console.log(filterValue);

                dispatch({
                  type: SHOW_FILTER,
                  payload: false,
                });
              }}
            >
              <Text style={style.ButtonText}>Áp dụng</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Pressable>
  );
}

const style = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    position: "absolute",
    top: "25%",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  filterOverlay: {
    padding: 20,
    marginBottom: 70,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5,
  },
  extensionsOverlay: {
    width: "100%",
  },
  extensions: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: 600,
  },
  extensionsItem: {
    width: 140,
    height: 40,
    marginBottom: 5,
  },
  buttonOverlay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginTop: 10,
    marginBottom: 70,
  },
  buttonPrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#3772FF",
    marginTop: 6,
    marginBottom: 6,
  },
  buttonSecondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 40,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: "#ABB4BD",
  },
  ButtonText: {
    fontSize: 14,
    color: "#fff",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowFilter: (value) => dispatch(showFilterReducer(value)),
    filterValue: (value) => dispatch(filterValueReducer(value)),
  };
};

const mapStateToProps = (state) => {
  return {
    filterValue: state.filterValueReducer.filterValue,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
