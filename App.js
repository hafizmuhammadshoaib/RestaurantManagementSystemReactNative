import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';

import Splash from "./src/Screens/Splash/Splash";

import SignIn from './src/Screens/SignIn/SignIn';

import Home from './src/Screens/Home/Home';
import ConfirmOrder from './src/Screens/ConfirmOrder/ConfirmOrder'

import OrderListing from './src/Screens/OrderListing/OrderListing';

import { Provider } from "react-redux";

import { store } from './src/Store/index';

import { createStackNavigator } from 'react-navigation';

import Menu from './src/Screens/Menu/Menu';
export default class App extends Component {

  render() {

    return (

      <Provider store={store} >
        <View style={{ flex: 1 }} >
          <RootStack />
        </View>
      </Provider>

    );

  }
}
const RootStack = createStackNavigator({
  splash: Splash,
  signIn: SignIn,
  home: Home,
  order: OrderListing,
  menu:Menu,
  confirmorder: ConfirmOrder
}, {
    initialRouteName: "menu",
    navigationOptions: {
      title: 'Kolachi',
      headerStyle: {
        backgroundColor: "#C72928"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  });
const prevGetStateForActionHomeStack = RootStack.router.getStateForAction;
RootStack.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionHomeStack(action, state);
};