import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInput: "", passInput: ""
        }
    }
    inputHandler = (text, name) => {
        this.setState({ name: text })
    }
    buttonHandler = () => {
        let obj = {
            email: this.state.emailInput,
            pass: this.state.passInput
        }

    }
    render() {
        return (
            <View>
                <TextInput placeholder="Email Input" onChangeText={(text) => { this.inputHandler(text, "emailInput") }} value={this.state.emailInput} />
                <TextInput placeholder="Password Input" secureTextEntry={true} onChangeText={(text) => { this.inputHandler(text, "passInput") }} value={this.state.passInput} />
                <Button onPress={() => { this.buttonHandler}}
                    title="SignIn" />
            </View>)
    }
}