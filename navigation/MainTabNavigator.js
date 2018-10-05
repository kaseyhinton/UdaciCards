import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import AddCardScreen from "../screens/AddCardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import QuizScreen from "../screens/QuizScreen";
import DeckScreen from "../screens/DeckScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddCard: AddCardScreen,
  Quiz: QuizScreen,
  Deck: DeckScreen,
  AddDeck: AddDeckScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-settings${focused ? "" : "-outline"}`
          : "md-settings"
      }
    />
  )
};

export default createBottomTabNavigator(
  {
    HomeStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);
