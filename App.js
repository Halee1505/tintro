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
import LeaserHomePage from "./components/leaserHomePage";
import RoomDetail from "./components/homePage/roomDetail";
import AddHome from "./components/leaser/addHome";
import AddHomeNext from "./components/leaser/addHomeNext";
import LeaserHomeDetail from "./components/leaserHomePage/leaserHomeDetail";
import Bill from "./components/leaser/bill";
import Me from "./components/me";
import BillDetail from "./components/leaser/bill/billDetail";
import ElectricWater from "./components/leaser/electricWater";
import MyRoom from "./components/renter/myRoom";
import Notification from "./components/renter/notification";
import ManageRoom from "./components/renter/roomInfo/manageRoom";
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
          <Stack.Screen
            name="me"
            component={Me}
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
            name="RENTER/home-page"
            component={HomePage}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="room-detail"
            component={RoomDetail}
            options={{
              title: "Chi tiết phòng",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="RENTER/my-room"
            component={MyRoom}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="RENTER/my-room/manage"
            component={ManageRoom}
            options={{
              title: "Quản lý phòng trọ",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="RENTER/notification"
            component={Notification}
            options={{
              title: "TINTRO",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="LEASER/home-page"
            component={LeaserHomePage}
            options={{
              title: "Phòng trọ của tôi",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="LEASER/home-page/detail"
            component={LeaserHomeDetail}
            options={{
              title: "Chi tiết phòng trọ",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="LEASER/add-home"
            component={AddHome}
            options={{
              title: "Thêm phòng trọ",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="LEASER/add-home/next"
            component={AddHomeNext}
            options={{
              title: "Thêm phòng trọ",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="LEASER/bill"
            component={Bill}
            options={{
              title: "Hóa đơn",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="LEASER/electricWater"
            component={ElectricWater}
            options={{
              title: "Thống kê điện nước",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="LEASER/bill/detail"
            component={BillDetail}
            options={{
              title: "Hóa đơn",

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
