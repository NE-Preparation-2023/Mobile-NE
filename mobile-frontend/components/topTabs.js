import React from "react";
import { View, Image, TouchableOpacity, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Checkout from '../screens/CheckoutScreen.js';

const TopTab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#25D482",
        tabBarStyle: {
         backgroundColor: '#ffffff',
         color:'#000000',
          marginTop: StatusBar.currentHeight,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#25D482',
          height: 4,
        },
      }}
      //   tabBar={(props) => <CustomTabBar props={props} />}
    >
      <TopTab.Screen name="AddFood" component={Checkout} />

      <TopTab.Screen name="AddCategory" component={Checkout} />
    </TopTab.Navigator>
  );
};

export default TopTabs;