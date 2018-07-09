import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, Image, ImageBackground,Dimensions,TextInput } from 'react-native';
import BackgroundImage from './BackgroundImage';

const {height,fontScale,scale,width}=Dimensions.get("window")
export default class Splash extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("in splash");
        return (
            <ImageBackground source={require('./background.jpg')} style={styles.container}>
                {/* <View style={{backgroundColor:'rgba(0,0,0,0)',flex:1}} ></View>
                <Text style={styles.text}  >Inside</Text> */}
                
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"column",
        width:width,
        height:height,
        alignItems:"center",
        

        
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection:"column"
        // backgroundColor: '#fff',        
       
    },
    text: {
        
        color: 'white',
        backgroundColor: '#000',
        fontSize: 32,
        marginTop:height/2
    }
});