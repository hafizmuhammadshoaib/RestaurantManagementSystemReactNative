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
import { Provider } from "react-redux";
import {store} from './src/Store/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
      <NativeRouter>
        <View >
          {/* <View style={styles.nav}>
        <Link
          to="/"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
            <Text>Home</Text>
        </Link>
        <Link
          to="/about"
          underlayColor='#f0f4f7'
          style={styles.navItem}>
            <Text>About</Text>
        </Link>
        <Link
          to="/topics"
          underlayColor='#f0f4f7'
          style={styles.navItem} >
            <Text>Topics</Text>
        </Link>
      </View> */}

          <Route exact path="/" component={SignIn} />
          <Route path="/home" component={Home} />
          {/* <Route path="/topics" component={Topics} /> */}
        </View>
      </NativeRouter>
      </Provider>
    );
  }
}

