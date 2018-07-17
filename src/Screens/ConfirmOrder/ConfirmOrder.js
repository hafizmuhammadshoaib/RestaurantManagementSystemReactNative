import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Dimensions, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Icon, Card, CardItem, Body, Spinner, List, Button, ListItem } from "native-base";
import { connect } from "react-redux";
import AuthActions from '../../Store/Actions/AuthActions/AuthActions';
import DBActions from "../../Store/Actions/DBActions/DBActions";
import { TestScheduler } from 'rxjs/testing/TestScheduler';
const { height, fontScale, scale, width } = Dimensions.get("window")

export default class ConfirmOrder extends Component {
    constructor(props) {
        super(props)


    }
    itemsArray = this.props.navigation.getParam('items')
    render() {
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 0.1 ,backgroundColor:"#FEF7E8"}} >
                    <Text>Your Order</Text>
                </View>
                <FlatList data={this.itemsArray} style={{ flex: 0.55, backgroundColor: "#FFF" }} renderItem={({ item, index }) =>
                    <ListItem style={{backgroundColor:"#FFF"}} >
                        <Text style={{backgroundColor:"#FCA82D",color:"#FFF",borderRadius:scale*200,width:scale*10,height:scale*10,textAlign:"center",textAlignVertical:"center"}} >{index + 1}</Text>
                        <View style={{marginLeft:width*1/8}} >
                            <Text>{item.item}</Text>
                            <Text>{`QTY - ${item.qty} `}</Text>
                        </View>
                    </ListItem>
                } />
                <View style={{ flex: 0.1,backgroundColor:"#F6F6F6" }} >
                    <Text style={{color:"#B42C2D",padding:scale*1,marginLeft:width*1/8}}>Total</Text>
                    <Text style={{color:"#000",marginLeft:width*1/8}} >{` ${this.itemsArray.length} Item`}</Text>
                </View>

                <View style={{ alignSelf: "flex-end", flex: 0.25,alignItems:"center",backgroundColor:"#fff",width:width,justifyContent:"space-between" }} >
                    <Card>
                        <CardItem button  style={{ backgroundColor: "#CE2A2E", justifyContent: "center",alignItems:"center",width:width*0.75,marginBottom:scale*3 }} >
                            <Text style={{ color: "#FFF" }} > Confirm Order </Text>
                        </CardItem>
                        <CardItem button  style={{ backgroundColor: "#FFF", justifyContent: "center",alignItems:"center",width:width*0.75,borderColor:"#CE2A2E",borderWidth:scale*1,borderStyle:"solid" }} >
                            <Text style={{ color: "#CE2A2E" }} > Cancel </Text>
                        </CardItem>
                    </Card>
                    
                    
                </View>

            </View>
        )
    }
}