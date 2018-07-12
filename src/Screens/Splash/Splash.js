import React, { Component } from 'react';
import { connect } from "react-redux";

import { Platform, StyleSheet, Text, View, Image, ImageBackground,Dimensions,TextInput } from 'react-native';
import {Header,Container} from "native-base";
import BackgroundImage from './BackgroundImage';
import AuthActions from '../../Store/Actions/AuthActions/AuthActions';

const {height,fontScale,scale,width}=Dimensions.get("window")
 class Splash extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.checkUser();
    }
    componentWillReceiveProps(nextProps){
        console.log("user",nextProps.user);
        if(nextProps.auth.user){
            this.props.history.replace("/home")
        }
        else{
            this.props.history.replace("/signIn");
        }
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
const mapStateToProps = state => {
    console.log(state);
    return {
        auth: state.authReducer,
        isProgress: state.authReducer.isProgress,
        isError: state.authReducer.isError,
        errorText: state.authReducer.errorText
    };
};
const mapDispatchToProps = dispatch => {
    return {
       checkUser:()=>dispatch(AuthActions.checkUser())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Splash);
