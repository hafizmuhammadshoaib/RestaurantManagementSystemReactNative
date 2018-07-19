import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, ImageBackground, Dimensions, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Container, Header, Content, Tab, Tabs, List, ListItem, Icon, Button } from "native-base";
// const { width, height, fontScale, scale } = Dimensions.get('window');
const { height, fontScale, scale, width } = Dimensions.get("window");
import DBActions from "../../Store/Actions/DBActions/DBActions";

export default class Bill extends Component {

    constructor(props) {
        super(props);
        this.state={total:0}


    }
    orderArray = [];
    componentWillMount() {
        this.orderArray = this.props.navigation.getParam("orderArray");
        console.log("/////orderArray/////", this.orderArray[0].items)
        this.calucateTotal(this.orderArray[0].items)
    }
    calucateTotal=(array)=>{
        let total=0
        array.forEach(val=>{
           total+= val.qty*val.price;
        })
        this.setState({total:total})
    }
   
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }} >
                <View style={{ flex: 0.1, justifyContent: "space-between", flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff7ea' }}>
                    <View>
                        <Text style={{ fontSize: fontScale * 12, fontWeight: '700' }}>{`${this.props.tableId} - Main Order`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>

                    </View>

                </View>
                <FlatList

                    style={{ flex: 0.5, backgroundColor: "#fff" }}
                    extraData={this.state}
                    data={this.orderArray[0].items}
                    // keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        console.log('item ', item.item)
                        console.log('index ', )
                        this.total+=item.qty*item.price
                        console.log(this.total)
                        return (
                            <ListItem style={{ justifyContent: "space-between" }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: fontScale * 12, backgroundColor: '#f7b72c', borderRadius: 500, color: '#fff', height: 25, width: 25, textAlignVertical: 'center', textAlign: 'center' }}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <View style={{ paddingLeft: 10 }}>
                                        <Text style={{ fontSize: fontScale * 14, textAlign: 'left', fontWeight: '700' }}>{item.item}</Text>
                                        <Text style={{ fontSize: fontScale * 14, alignSelf: 'flex-start' }}><Text style={{ color: '#b4b4b4', fontSize: fontScale * 14 }}>QTY{" - "}</Text>{item.qty}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <Text> {item.qty * item.price} </Text>
                                </View>
                            </ListItem>
                        )
                    }} />
                    {/* {this.setState({total:this.total})} */}
                <View style={{ flex: 0.4, backgroundColor: '#fff',justifyContent:"center" }}>
                    <View style={{ flexDirection: "row" ,justifyContent:'space-between',padding:height*1/40,borderBottomColor:"#BE2B2B",borderBottomWidth:scale*1}} >
                        <Text style={{fontSize:fontScale*20,color:"#BE2B2B",fontWeight:"bold"}} >
                            Total Price
                    </Text>
                        <Text style={{fontSize:fontScale*20,color:"#BE2B2B",fontWeight:"bold"}} >{this.state.total}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { }} style={{marginTop:height*1/50}}>
                        <Text style={{ padding: scale * 10, alignSelf: 'center', textAlign: "center", width: width * 0.75, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ce4728', color: "#ce4728", fontSize: fontScale * 14, fontWeight: '700' }}>
                            Done
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

}