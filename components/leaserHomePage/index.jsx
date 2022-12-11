import { connect } from "react-redux";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import Navigator from "../navigator";
function LeaserHomePage({ navigation }) {
  const user = useSelector((state) => state.loginUserReducer);
  return (
    <View style={styles.container}>
      <Text>Leaser Home Page</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("LEASER/add-home");
        }}
        style={styles.addOverlay}
      >
        <Text style={styles.addContent}>+</Text>
      </Pressable>
      <Navigator navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  addOverlay: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  addContent: {
    color: "#fff",
    fontSize: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.loginUserReducer,
  };
};

export default connect(mapStateToProps)(LeaserHomePage);
