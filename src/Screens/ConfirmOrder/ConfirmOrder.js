import React, { Component } from 'react';
import { Container, Header, Content, Form, Input, Text, Item, Button, Card, CardItem, Left, Body, Right, Footer, ListItem } from "native-base";
import { Platform, StyleSheet, View, TextInput, Dimensions, ListView, Image, ScrollView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import DBActions from "../../Store/Actions/DBActions/DBActions";
import FirebaseDB from '../../Store/Firebase/firebaseDB';
import { connect } from "react-redux";

const { height, fontScale, scale, width } = Dimensions.get("window");


class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            flag: false,
        }
    }
    componentDidMount() {
        // this.props.loadMenu()

        let orders = this.props.navigation.state.params.state;
        console.log(orders);
        this.setState({ orderList: orders });
    }

    static navigationOptions = {
        
    }

    confirmOrder = () => {
        // this.setState({ orderConfirm: true });
        let obj = {
            items: this.state.orderList,
            timeCreated: new Date().getTime(),
            status: "confirmed",
            "ETA": new Date().getTime() + 1200000
        }
        this.props.doneOrder(obj,"T1");
    }

    doneOrder = () => {
    }
    render() {
        // console.log(this.props.navigation.state.params.state);
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }} >
                <View style={{ flex: 0.1, justifyContent: "space-between", flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff7ea' }}>
                    <View>
                        <Text style={{ color: "#b4b4b4", fontSize: fontScale * 15, fontWeight: '700' }}>Your Order</Text>
                        <Text style={{ fontSize: fontScale * 12, fontWeight: '700' }}>S35 Main Order</Text>
                        <Text style={{ fontSize: fontScale * 12, fontWeight: '700' }}>Total Items: {this.state.orderList.length}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        {
                            this.state.orderConfirm ?
                                null
                                :
                                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); this.setState({ orderList: [] }) }} >
                                    <Text style={{ backgroundColor: 'green', color: "#fff", borderRadius: 5, padding: 10, fontSize: fontScale * 12, fontWeight: '700' }}>
                                        Add More Item
                            </Text>
                                </TouchableOpacity>
                        }
                    </View>

                </View>
                <FlatList

                    style={{ flex: 0.5, backgroundColor: "#fff" }}
                    extraData={this.state}
                    data={this.state.orderList}
                    // keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        console.log('item ', item.item)
                        console.log('index ', )

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
                                </View>
                            </ListItem>
                        )
                    }} />
                <View style={{ flex: 0.4, backgroundColor: '#fff' }}>
                    <TouchableOpacity onPress={this.confirmOrder}>
                        <Text style={{ padding: scale * 10, alignSelf: 'center', textAlign: "center", width: width * 0.75, backgroundColor: "#ce4728", color: "#fff", fontSize: fontScale * 14, fontWeight: '700', marginBottom: scale * 2 }}>
                            Confirm Order
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cancelOrder}>
                        <Text style={{ padding: scale * 10, alignSelf: 'center', textAlign: "center", width: width * 0.75, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ce4728', color: "#ce4728", fontSize: fontScale * 14, fontWeight: '700' }}>
                            Cancel
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
        
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadTables: () => dispatch(DBActions.loadTables()),
        loadMenu: () => dispatch(DBActions.loadMenu()),
        doneOrder: (obj,tableId) => dispatch(DBActions.pushDoneOrder(obj,tableId))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmOrder);
