import React from "react";

import HomePage from "./HomePage";
import HostPage from "./HostPage";
import AudiencePage from "./AudiencePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNav from "./components/Layout/BottomNav";
import Home from "./screens/Home";
import AboutUs from "./screens/StaticScreens/AboutUs";
import SearchBar from "./components/SearchComponents/SearchBar";
import Search from "./screens/Search";
import Calendar from "./screens/Calendar";
import CreatorStudio from "./screens/SidebarScreens/CreatorStudio";
import Referandwin from "./screens/SidebarScreens/Referandwin";
import Setting from "./screens/SidebarScreens/Setting";
import TandC from "./screens/SidebarScreens/TandC";
import Wallet from "./screens/SidebarScreens/Wallet";
import ForMe from "./screens/ForMe";
import Notifications from "./screens/Notifications";
import Inbox from "./screens/Inbox";
import Mentor from "./screens/SearchOptionsScreen/Mentor";
import Following from "./screens/SearchOptionsScreen/Following";
import Coaches from "./screens/SearchOptionsScreen/Coaches";
import MyCourses from "./screens/SearchOptionsScreen/MyCourses";
import AudioPlayingScreen from "./screens/PlayingScreens/AudioPlayingScreen";
import VideoPlayingScreen from "./screens/PlayingScreens/VideoPlayingScreen";
import Podcasts from "./screens/Podcasts";
import Events from "./screens/OriginalsScreen/Events";
import Karyashala from "./screens/OriginalsScreen/Karyashala";
import Pathshala from "./screens/OriginalsScreen/Pathshala";
import UpldoadContent from "./screens/CreatorScreens/UpldoadContent";
import StoreScreen from "./screens/EcommerceScreens/StoreScreen";
import ProductDetails from "./screens/EcommerceScreens/ProductDetails";
import Login from "./screens/AuthScreens/Login";
import Signup from "./screens/AuthScreens/Signup";
import AudioStream from "./screens/CreatorScreens/AudioStream";

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function AppNavigation(props) {
    return (
        <Tab.Navigator initialRouteName="Home" tabBar={props => <BottomNav {...props} />}>
            <Tab.Screen options={{headerShown: false}} headerMode="none" name="Home" component={Home} />
            {/* <Tab.Screen options={{headerShown: false}} headerMode="none" name="HomePage" component={HomePage} /> */}
            <Tab.Screen options={{headerShown: false}} name="HostPage" component={HostPage} />
            <Tab.Screen options={{headerShown: false}} name="AudiencePage" component={AudiencePage} />
            <Tab.Screen options={{headerShown: false}} name="Search" component={Search} />
            <Tab.Screen options={{headerShown: false}} name="Calendar" component={Calendar} />
            <Tab.Screen options={{headerShown: false}} name="Creator" component={CreatorStudio} />
            <Tab.Screen options={{headerShown: false}} name="Audio Stream" component={AudioStream} />
            <Tab.Screen options={{headerShown: false}} name="Refer" component={Referandwin} />
            <Tab.Screen options={{headerShown: false}} name="Setting" component={Setting} />
            <Tab.Screen options={{headerShown: false}} name="T&C" component={TandC} />
            <Tab.Screen options={{headerShown: false}} name="Wallet" component={Wallet} />
            <Tab.Screen options={{headerShown: false}} name="ForMe" component={ForMe} />
            <Tab.Screen options={{headerShown: false}} name="Notifications" component={Notifications} />
            <Tab.Screen options={{headerShown: false}} name="Inbox" component={Inbox} />
            <Tab.Screen options={{headerShown: false}} name="Mentor" component={Mentor} />
            <Tab.Screen options={{headerShown: false}} name="Following" component={Following} />
            <Tab.Screen options={{headerShown: false}} name="Coaches" component={Coaches} />
            <Tab.Screen options={{headerShown: false}} name="MyCourses" component={MyCourses} />
            <Tab.Screen options={{headerShown: false}} name="AudioPlay" component={AudioPlayingScreen} />
            <Tab.Screen options={{headerShown: false}} name="VideoPlay" component={VideoPlayingScreen} />
            <Tab.Screen options={{headerShown: false}} name="Podcasts" component={Podcasts} />
            <Tab.Screen options={{headerShown: false}} name="Events" component={Events} />
            <Tab.Screen options={{headerShown: false}} name="Karyashala" component={Karyashala} />
            <Tab.Screen options={{headerShown: false}} name="Pathshala" component={Pathshala} />
            {/* Static Screens */}
            <Tab.Screen options={{headerShown: false}} name="AboutUs" component={AboutUs} />
            <Tab.Screen options={{headerShown: false}} name="Upload" component={UpldoadContent} />
            <Tab.Screen name="Store" component={StoreScreen} options={{headerShown: false}} />
            <Tab.Screen name="ProductDetails" component={ProductDetails} options={{headerShown: false}} />
            <Tab.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Tab.Screen name="Signup" component={Signup} options={{headerShown: false}} />
        </Tab.Navigator>
    );
}