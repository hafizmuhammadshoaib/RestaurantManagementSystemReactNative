import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, ImageBackground, Dimensions, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Container, Header, Content, Tab, Tabs, List, ListItem, Icon, Button } from "native-base";
// const { width, height, fontScale, scale } = Dimensions.get('window');
import DBActions from "../../Store/Actions/DBActions/DBActions";

const { height, fontScale, scale, width } = Dimensions.get("window");

import { StackActions, NavigationActions } from 'react-navigation';


 class Bill extends Component {

    constructor(props) {
        super(props);
        this.state = { total: 0 }


    }
    orderArray = [];
    historyKeys = [];
    historyRef = [];
    componentWillMount() {
        this.orderArray = this.props.navigation.getParam("orderArray");
        console.log("/////orderArray/////", this.orderArray[0].items)
        this.historyKeys = Object.keys(this.orderArray[0].history)
        this.historyRef = this.orderArray[0].history;
        this.calucateTotal(this.orderArray[0].items,this.historyKeys)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.billDone==="billDone"){
            this.reset("home");
        }
    }
    calucateTotal = (array1,array2) => {
        let total = 0
        array1.forEach(val => {
            total += val.qty * val.price;
        })
        array2.forEach(val=>{
            this.historyRef[val].forEach(val=>{
                total+=val.qty*val.price
            })
        })
        this.setState({ total: total })
    }
    reset = (route) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: `${route}` })],
        });
        this.props.navigation.dispatch(resetAction);
    }
    billDoneCallBack=()=>{
        alert("done");
        this.props.doneBill(this.props.tableId,this.props.orderId)
        
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: "#fff", flexWrap: "wrap" }} >
                <View style={{ flex: 0.05, justifyContent: "space-between", flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff7ea', }}>
                    <View>
                        <Text style={{ fontSize: fontScale * 12, fontWeight: '700' }}>{`${this.props.tableId} - Main Order`}</Text>
                    </View>


                </View>
                <View style={{ flex: 0.35, }} >
                    <FlatList

                        style={{ backgroundColor: "#fff", }}
                        extraData={this.state}
                        data={this.orderArray[0].items}
                        // keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            console.log('item ', item.item)
                            console.log('index ', )
                            this.total += item.qty * item.price
                            console.log(this.total)
                            return (
                                <ListItem style={{ justifyContent: "space-between", }}>
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
                </View>
                {/* {this.setState({total:this.total})} */}

                <View style={{ backgroundColor: '#fff7ea', flex: 0.05, justifyContent: "center" }} >
                    <Text style={{ fontSize: fontScale * 12, fontWeight: '700' }}>{`Additional Items`}</Text>
                </View>
                <View style={{ backgroundColor: '#fff', flex: 0.35, }} >

                    <FlatList data={this.historyKeys} renderItem={({ item, index }) => {



                      return ( <FlatList

                            style={{ backgroundColor: "#fff", }}
                            extraData={this.state}
                            data={this.historyRef[item]}
                            // keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                console.log('item ', item.item)
                                console.log('index ', )
                                this.total += item.qty * item.price
                                console.log(this.total)
                                return (
                                    <ListItem style={{ justifyContent: "space-between", }}>
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
                            }} />)
                    }}


                    />

                </View>

                <View style={{ flex: 0.2, backgroundColor: '#fff', justifyContent: "space-between", }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: height * 1 / 80, borderBottomColor: "#BE2B2B", borderBottomWidth: scale * 1 }} >
                        <Text style={{ fontSize: fontScale * 20, color: "#BE2B2B", fontWeight: "bold" }} >
                            Total Price
                    </Text>
                        <Text style={{ fontSize: fontScale * 20, color: "#BE2B2B", fontWeight: "bold" }} >{this.state.total}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this.billDoneCallBack()  }} style={{ marginBottom: height * 1 / 80 }}>
                        <Text style={{ padding: height * 1 / 60, alignSelf: 'center', textAlign: "center", width: width * 0.75, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ce4728', color: "#ce4728", fontSize: fontScale * 14, fontWeight: '700' }}>
                            Done
                    </Text>
                    </TouchableOpacity>
                </View>
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
        menu: state.dbReducer.menu,
        tableId: state.dbReducer.tableID,
        orderId: state.dbReducer.orderID,
        orderPushed: state.dbReducer.orderPushed,
        setUpdateFlag: state.dbReducer.setUpdateFlag,
        orderUpdated: state.dbReducer.orderUpdated,
        billDone:state.dbReducer.billDone
    };
};
const mapDispatchToProps = dispatch => {
    return {
        doneBill:(tableId,orderId)=>dispatch(DBActions.billDone(tableId,orderId))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bill);