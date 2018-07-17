import React, { Component } from 'react';
import { Container, Header, Content, Form, Input, Text, Item, Button, Card, CardItem, Left, Body, Right, Footer } from "native-base";
import { Platform, StyleSheet, View, TextInput, Dimensions, ListView, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import DBActions from "../../Store/Actions/DBActions/DBActions";
import { connect } from "react-redux";

const { height, fontScale, scale, width } = Dimensions.get("window");

const colors = {
    free: "#5aaf79",
    occupied: '#0278be'
}

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.loadTables();
        // this.props.loadMenu()
    }

    render() {
        console.log(this.props.tables)
        return (
            <View style={{ flex: 1 }} >
                {/* <Header style={{ backgroundColor: "#C72928" }} androidStatusBarColor="#B71D1D" >
                    <Left >
                        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: fontScale * 20 }} > Kolachi</Text>
                    </Left>

                    <Right />
                </Header> */}
                <StatusBar backgroundColor="#B71D1D" />
                <ScrollView style={{ flexWrap: "wrap", height: height }} >
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap', flex: 1
                    }} >

                        {
                            (!this.props.tables) ? null :
                                this.props.tables.map((value, index) => {
                                    console.log('value: ***************/////**', value);
                                    return (<TouchableOpacity key={index} style={{ width: width / 2, height: height * 0.35, backgroundColor: "#F5F5F5" }} onPress={() => { this.props.navigation.navigate(value.status == 'occupied' ? 'order' : 'menu', { tableName: value.key }) }}>
                                        <Card style={{ backgroundColor: colors[value.status] }}>
                                            <CardItem style={{ backgroundColor: colors[value.status], justifyContent: "center", shadowColor: "#C3C5C7", }} >
                                                <Text style={{ color: '#fff', fontSize: fontScale * 30, fontWeight: "bold", padding: 10 }}  >{value.key}</Text>
                                            </CardItem>
                                            <View
                                                style={{
                                                    borderBottomColor: '#D5D5D5',
                                                    borderBottomWidth: 1,
                                                    width: "90%",
                                                    alignSelf: "center"
                                                }}
                                            />
                                            <CardItem style={{ backgroundColor: colors[value.status], padding: 0, margin: 0, justifyContent: "space-between", }} >
                                                <Image source={require('./seat.png')} />
                                                <View style={{ paddingRight: fontScale * 25 }}>
                                                    <Text style={{ color: '#fff' }}>Total</Text>
                                                    <Text style={{ color: '#fff', fontSize: fontScale * 15, fontWeight: "bold", alignSelf: 'flex-start' }} >{`Seats ${value.seats}`}</Text>
                                                </View>
                                            </CardItem>
                                            <CardItem style={{ backgroundColor: colors[value.status], padding: 0, margin: 0, justifyContent: "space-between" }}>
                                                <Image source={require('./timer.png')} />
                                                <View  >
                                                    <Text style={{ color: '#fff' }}>Free Since</Text>
                                                    <Text style={{ color: '#fff', fontSize: fontScale * 15, fontWeight: "bold" }} >10:08 PM</Text>
                                                </View>
                                            </CardItem>

                                        </Card>
                                    </TouchableOpacity>)
                                })
                        }

                    </View>
                    {/* <Grid>
                    <Row style={{ backgroundColor: "yellow", }} >
                        <Col style={{ backgroundColor: "green", }} >
                        <Text>one</Text>
                        <Text>one</Text>
                        <Text>one</Text>
                        
                        </Col>
                        <Col style={{ backgroundColor: "cyan" }} ></Col>
                        <Col style={{ backgroundColor: "grey" }} ></Col>

                    </Row>
                </Grid> */}
                    {/* <Grid>
                    <Col style={{ backgroundColor: "blue" }} > */}
                    {/* <Row style={{ backgroundColor: "green" }} ></Row>
                        <Row style={{ backgroundColor: "cyan" }} ></Row>
                        <Row style={{ backgroundColor: "grey" }} ></Row> */}
                    {/* 
                    </Col>
                </Grid>
                <Grid>
                    <Col style={{ backgroundColor: "green" }} > */}
                    {/* <Row style={{ backgroundColor: "green" }} ></Row>
                        <Row style={{ backgroundColor: "cyan" }} ></Row>
                        <Row style={{ backgroundColor: "grey" }} ></Row> */}

                    {/* </Col>
                </Grid>
                <Grid>
                    <Col style={{ backgroundColor: "black" }} > */}
                    {/* <Row style={{ backgroundColor: "green" }} ></Row>
                        <Row style={{ backgroundColor: "cyan" }} ></Row>
                        <Row style={{ backgroundColor: "grey" }} ></Row> */}

                    {/* </Col>
                </Grid> */}
                </ScrollView>
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
        errorText: state.authReducer.errorText,
        tables: state.dbReducer.tables,
        menu: state.dbReducer.menu
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadTables: () => dispatch(DBActions.loadTables()),
        loadMenu: () => dispatch(DBActions.loadMenu())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);