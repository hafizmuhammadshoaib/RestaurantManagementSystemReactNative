import React, { Component } from 'react';
import { Container, Header, Content, Form, Input, Text, Item, Button, Card, CardItem, Left, Body, Right, Footer } from "native-base";
import { Platform, StyleSheet, View, TextInput, Dimensions, ListView, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
const { height, fontScale, scale, width } = Dimensions.get("window");


export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, }} >
                <Header style={{ backgroundColor: "#C72928" }} androidStatusBarColor="#B71D1D" >
                    <Left >
                        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 20 }} > Kolachi</Text>
                    </Left>

                    <Right />
                </Header>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap', flex: 1
                }} >
                    <View style={{ width: width / 2, height: height / 3.2, backgroundColor: "#F5F5F5" }} >
                        <Card  >
                            
                                <CardItem style={{ justifyContent: "center", shadowColor: "#C3C5C7", }} >
                                    <Text style={{ fontSize: 30, fontWeight: "bold", padding: 10 }}  >T1</Text>

                                </CardItem>
                                <View
                                    style={{
                                        borderBottomColor: '#D5D5D5',
                                        borderBottomWidth: 1,
                                        width: "90%",
                                        alignSelf: "center"
                                    }}
                                />

                                <CardItem style={{ padding: 0, margin: 0, justifyContent: "space-between", }} >

                                    <Image source={require('./seat.png')} />
                                    <View>
                                        <Text>Total</Text>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }} >Seats 4</Text>

                                    </View>

                                </CardItem>
                                <CardItem style={{ padding: 0, margin: 0, justifyContent: "space-between" }}>
                                    <Image source={require('./timer.png')} />
                                    <View  >
                                        <Text>Free Since</Text>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }} >10:08 PM</Text>
                                    </View>
                                </CardItem>
                            
                        </Card>
                    </View>

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
            </View>


        )
    }
}