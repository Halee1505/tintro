import { Provider } from "react-redux";
// import "react-native-gesture-handler";
import store from "./redux/Stores";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
import Navigator from "./components/navigator";
import LeaserNavigator from "./components/navigator/leaserNavigator";
//import components
import Welcome from "./components/welcome/index.js";
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
import ModifyLeaserHome from "./components/leaserHomePage/modifiLeaserHome";
import Bill from "./components/leaser/bill";
import BillDetail from "./components/leaser/bill/billDetail";
import ElectricWater from "./components/leaser/electricWater";
import ElectricWaterDetail from "./components/leaser/electricWater/electricWaterDetail";
import Me from "./components/me";
import MyRoom from "./components/renter/myRoom";
import Notification from "./components/renter/notification";
import ManageRoom from "./components/renter/roomInfo/manageRoom";
import ManageBill from "./components/renter/manageBill";
import RenterElectricWater from "./components/renter/electricWater";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          detachInactiveScreens={false}
          tabBar={(props) => {
            if (store.getState().loginUserReducer.user.mRole === "LEASER") {
              return <LeaserNavigator {...props} />;
            } else if (
              store.getState().loginUserReducer.user.mRole === "RENTER"
            ) {
              return <Navigator {...props} />;
            }
          }}
          initialRouteName="Home"
        >
          <Tab.Group>
            <Tab.Screen
              name="Home"
              component={Welcome}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="me"
              component={Me}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="login"
              initialRouteName="Home"
              component={Login}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              initialParams={{ change: Math.random() }}
            />
            <Tab.Screen
              name="forgot-password"
              component={ForgotPassword}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="Check-mail"
              component={checkMail}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="new-password"
              component={NewPassword}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="register"
              component={Register}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="otp"
              component={Otp}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Tab.Group>
          <Tab.Group>
            <Tab.Screen
              name="RENTER/home-page"
              component={HomePage}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="room-detail"
              component={RoomDetail}
              options={{
                title: "Chi ti???t ph??ng",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="RENTER/my-room"
              component={MyRoom}
              options={{
                title: "TINTRO",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="RENTER/my-room/manageRoom"
              component={ManageRoom}
              options={{
                title: "Qu???n l?? ph??ng tr???",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="RENTER/my-room/manageBill"
              component={ManageBill}
              options={{
                title: "Qu???n l?? h??a ????n",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="RENTER/electricWater"
              component={RenterElectricWater}
              options={{
                title: "Th???ng k?? ??i???n n?????c",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="RENTER/notification"
              component={Notification}
              options={{
                title: "Th??ng b??o",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Tab.Group>
          <Tab.Group>
            <Tab.Screen
              name="LEASER/home-page"
              component={LeaserHomePage}
              options={{
                title: "Ph??ng tr??? c???a t??i",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/home-page/detail"
              component={LeaserHomeDetail}
              options={{
                title: "Chi ti???t ph??ng tr???",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/home-page/detail/modify"
              component={ModifyLeaserHome}
              options={{
                title: "Qu???n l?? ph??ng tr???",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/add-home"
              component={AddHome}
              options={{
                title: "Th??m ph??ng tr???",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/add-home/next"
              component={AddHomeNext}
              options={{
                title: "Th??m ph??ng tr???",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/bill"
              component={Bill}
              options={{
                title: "H??a ????n",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/electricWater"
              component={ElectricWater}
              options={{
                title: "Th???ng k?? ??i???n n?????c",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/electricWater/room"
              component={ElectricWaterDetail}
              options={{
                title: "Th???ng k?? ??i???n n?????c",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Tab.Screen
              name="LEASER/bill/detail"
              component={BillDetail}
              options={{
                title: "H??a ????n",

                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Tab.Group>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
