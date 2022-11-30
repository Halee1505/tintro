import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/Stores";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//import components
import Welcome from "./components/welcome/index.js";
import Button from "./components/button/index.js";
import Login from "./components/login/index.js";
import ForgotPassword from "./components/forgotPassword";
import checkMail from "./components/forgotPassword/checkMail";
import NewPassword from "./components/forgotPassword/newPassword";
import Register from "./components/register";
import Otp from "./components/register/otp";
import HomePage from "./components/homePage";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Welcome}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen name="Profile" component={Button} />
          <Stack.Screen
            name="login"
            initialRouteName="Home"
            component={Login}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="forgot-password"
            component={ForgotPassword}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Check-mail"
            component={checkMail}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="new-password"
            component={NewPassword}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="otp"
            component={Otp}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="home-page"
            component={HomePage}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
