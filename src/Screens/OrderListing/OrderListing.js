import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
// import { Container, Header } from "native-base";
import { Container, Header, Content, Form, Input, Item, Button, Card, CardItem, Left, Body, Right, Footer, Tab, Tabs, TabHeading, ListItem, List } from "native-base";
const { height, fontScale, scale, width } = Dimensions.get("window");
import { connect } from "react-redux";
const colorObject

class OrderListing extends Component {
    constructor(props) {
        super(props);
        this.state = { orderId: "undefined" }
        tableName = this.props.navigation.getParam('tableName');
        tableIndex = this.props.tables.findIndex((element) => { return element.key == this.tableName })
        orderArray = Object.values(this.props.tables[this.tableIndex].Orders)
        orderKeyArray = Object.keys(this.props.tables[this.tableIndex].Orders);

    }
    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    findOrder(element, tableName) {
        return element.key == tableName
    }
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#212121',
            width: width * 1
        }
    }

    render() {
        this.orderKeyIndex = 0
        console.log(this.orderKeyArray)
        return (
            <View style={{ flex: 1 }}>

                <FlatList data={this.orderArray}
                    style={{ height: height / 2, flex: 0.5 }}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                        console.log(item)
                        return (<TouchableOpacity style={{ width: width / 2, height: height * 0.35, backgroundColor: "#F5F5F5" }} onPress={() => { this.setState({ orderId: this.orderKeyArray[index] }) }}  >
                            <Card   >

                                {/* <CardItem style={{ justifyContent: "center", shadowColor: "#C3C5C7", }} >
                                    <Text style={{ fontSize: fontScale * 30, fontWeight: "bold", padding: 10 }}  >{item}</Text>

                                </CardItem>
                                <View
                                    style={{
                                        borderBottomColor: '#D5D5D5',
                                        borderBottomWidth: 1,
                                        width: "90%",
                                        alignSelf: "center"
                                    }}
                                /> */}

                                <CardItem style={{ padding: 0, margin: 0, justifyContent: "center", }} >

                                    {/* <Image source={require('../Home/seat.png')} /> */}
                                    <View>
                                        <Text>Created</Text>
                                        <Text style={{ fontSize: fontScale * 15, fontWeight: "bold" }} >{this.formatAMPM(new Date(item.timeCreated))}</Text>

                                    </View>

                                </CardItem>
                                <CardItem style={{ padding: 0, margin: 0, justifyContent: "center" }}>

                                    <View  >
                                        <Text>Estimated Time</Text>
                                        <Text style={{ fontSize: fontScale * 15, fontWeight: "bold" }} >{`10 min`}</Text>
                                    </View>
                                </CardItem>
                                <CardItem style={{ justifyContent: "center" }} >
                                    <Text> {item.status} </Text>
                                </CardItem>

                                <View
                                    style={{
                                        borderBottomColor: '#D5D5D5',
                                        borderBottomWidth: 1,
                                        width: "90%",
                                        alignSelf: "center"
                                    }}
                                />
                                <CardItem style={{ justifyContent: "center", shadowColor: "#C3C5C7", }} >
                                    <Text style={{ fontSize: fontScale * 15, fontWeight: "bold", padding: 10 }}  >{`Order Id ${this.orderKeyArray[index]}`}</Text>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>


                        )
                    }}

                />

                {(this.state.orderId == "undefined") ? null :
                    <Tabs  >
                        <Tab heading="All">
                            <View style={{ flex: 1 }} >
                                <List>
                                    {
                                        this.props.tables[this.tableIndex].Orders[this.state.orderId].items.map((value) => {
                                            return (
                                                <ListItem style={{justifyContent:"space-between"}} >
                                                    <View>
                                                        <Text>{value.item}</Text>
                                                        <Text>{value.status}</Text>
                                                    </View>
                                                    <Text  >{value.qty}</Text>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>


                            </View>
                        </Tab>
                        <Tab heading="Queued" >
                            <View style={{ flex: 1 }} ><Text>tab2</Text></View>
                        </Tab>
                        <Tab heading="Cooking">
                            <View style={{ flex: 1 }} ><Text>tab3</Text></View>
                        </Tab>
                        <Tab heading="Delivered">
                            <View style={{ flex: 1 }} ><Text>tab3</Text></View>
                        </Tab>
                    </Tabs>}
            </View>
        )
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('tableName')
        };
    };
}
const mapStateToProps = state => {
    console.log(state);
    return {

        tables: state.dbReducer.tables
    };
};
const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderListing);