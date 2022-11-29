import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/Stores";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//import components
import HomePage from "./components/homePage/index.js";
import Button from "./components/button/index.js";
import Login from "./components/login/index.js";
import ForgotPassword from "./components/forgotPassword";
import checkMail from "./components/forgotPassword/checkMail";
import NewPassword from "./components/forgotPassword/newPassword";
import Register from "./components/register";
import Otp from "./components/register/otp";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Profile" component={Button} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="forgot-password" component={ForgotPassword} />
          <Stack.Screen name="Check-mail" component={checkMail} />
          <Stack.Screen name="new-password" component={NewPassword} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="otp" component={Otp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
