import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, Image, ImageBackground,Dimensions,TextInput } from 'react-native';
import {Header,Container} from "native-base";
import BackgroundImage from './BackgroundImage';

const {height,fontScale,scale,width}=Dimensions.get("window")
export default class Splash extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("in splash");
        return (
            <View>
                <Header style={{display:"none",}} androidStatusBarColor="#000" ></Header>
            <ImageBackground source={require('./background.jpg')} style={styles.container}>
                
                <Text style={styles.text}  >KOLACHI</Text>
                
                
                
            </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"column",
        width:width,
        height:height,
        alignItems:"center"
        
        

        
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection:"column"
        // backgroundColor: '#fff',        
       
    },
    text: {
        
        color: 'white',
        fontWeight:"bold",
        fontSize: 55,
        marginTop:height/2
    }
});