import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/Stores";

//import components
import HomePage from "./components/homePage/index.js";
import Button from "./components/button/index.js";
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <HomePage />
        <Button />
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
