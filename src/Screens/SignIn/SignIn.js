import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {connect} from "react-redux";
import AuthActions from '../../Store/Actions/AuthActions/AuthActions';
import DBActions from '../../Store/Actions/DBActions/DBActions';

 class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInput: "", passInput: ""
        }
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.user){
            this.props.history.push('/home')
        }
    }
    componentDidMount(){
        this.props.loadTables();
    }
    inputHandler = (text, name) => {
        let obj={}
        obj[name]=text
        this.setState(obj)
    }
    buttonHandler = () => {
        console.log("in button handler");
        let obj = {
            email: this.state.emailInput,
            password: this.state.passInput
        }
        console.log(obj);
        this.props.signInUser(obj);
    }
    render() {
        return (
            <View>
                <TextInput placeholder="Email Input" onChangeText={(text) => { this.inputHandler(text, "emailInput") }} value={this.state.emailInput} />
                <TextInput placeholder="Password Input" secureTextEntry={true} onChangeText={(text) => { this.inputHandler(text, "passInput") }} value={this.state.passInput} />
                <Button onPress={this.buttonHandler}
                    title="SignIn" />
            </View>)
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
      user: state.authReducer.user,
      isProgress: state.authReducer.isProgress,
      isError: state.authReducer.isError,
      errorText:state.authReducer.errorText
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
        signInUser:(user)=>dispatch(AuthActions.signinUser(user)),
        loadTables: () => dispatch(DBActions.loadTables())
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn);
  