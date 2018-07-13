/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import Splash from "./src/Screens/Splash/Splash";
import SignIn from './src/Screens/SignIn/SignIn';
import Home from './src/Screens/Home/Home';
import OrderListing from './src/Screens/OrderListing/OrderListing';
import { Provider } from "react-redux";
import { store } from './src/Store/index';
import { createStackNavigator, StackNavigator } from 'react-navigation';

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
  order: OrderListing
}, {
    initialRouteName: "splash",
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

