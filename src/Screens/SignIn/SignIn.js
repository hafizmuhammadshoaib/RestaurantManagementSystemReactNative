import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Dimensions, Text, StatusBar } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Icon, Button, Card, CardItem, Body, Spinner } from "native-base";
import { connect } from "react-redux";
import AuthActions from '../../Store/Actions/AuthActions/AuthActions';
const { height, fontScale, scale, width } = Dimensions.get("window")


import DBActions from '../../Store/Actions/DBActions/DBActions';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInput: "", passInput: ""
        }

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.user) {
            this.props.navigation.navigate('home')
        }
    }

    inputHandler = (text, name) => {
        let obj = {}
        obj[name] = text
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

            <View style={{ flexDirection: "column", justifyContent: "center", flex: 1, backgroundColor: "#FFFFFF" }}  >
                <StatusBar
                    backgroundColor="#b71d1d"
                // barStyle="light-content"
                // hidden={true}
                />
                <Text style={{ fontSize: 32, color: "#CE2A2E", textAlign: "center" }}>KOLACHI</Text>
                {/* <Content contentContainerStyle={{ justifyContent: 'center', flex: 0.5,flexDirection:"column"}}  > */}
                <View style={{ flexDirection: "row", flex: 0.5, alignItems: "center", backgroundColor: "#F5F5F5" }}>
                    <Card backgroundColor="#F5F5F5" >
                        <CardItem  >


                            <Item   >
                                <Icon style={{ color: "#2DB586" }} active name="person" />
                                <Input placeholder="Username" value={this.state.emailInput} onChangeText={(text) => this.inputHandler(text, "emailInput")} />
                            </Item>
                        </CardItem>
                        <CardItem>

                            <Item last >
                                <Icon style={{ color: "#2DB586" }} active name="lock" />
                                <Input secureTextEntry placeholder="Password" value={this.state.passInput} onChangeText={(text) => this.inputHandler(text, "passInput")} />
                            </Item>
                        </CardItem>
                        <CardItem button onPress={this.buttonHandler} style={{ backgroundColor: "#CE2A2E", justifyContent: "center" }} >
                            <Text style={{ color: "#FFF" }} > Login To Dashboard </Text>
                        </CardItem>


                    </Card>
                </View>
                {/* </Content> */}

                {this.props.isProgress ?
                    <Spinner color="#17A266" /> : null}
            </View>

        )
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.authReducer.user,
        isProgress: state.authReducer.isProgress,
        isError: state.authReducer.isError,
        errorText: state.authReducer.errorText
    };
};
const mapDispatchToProps = dispatch => {
    return {
        signInUser: (user) => dispatch(AuthActions.signinUser(user)),
        loadTables: () => dispatch(DBActions.loadTables())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
