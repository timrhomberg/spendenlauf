import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: true,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={24} color="black"/>
                ),

            }}/>
            <Tab.Screen name="Einstellung" component={SettingScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="settings-outline" size={24} color="black"/>
                )
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }
});
