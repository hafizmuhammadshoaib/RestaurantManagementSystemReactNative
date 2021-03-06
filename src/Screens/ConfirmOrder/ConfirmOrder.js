import React, { Component } from 'react';
import { Container, Header, Content, Form, Input, Text, Item, Button, Card, CardItem, Left, Body, Right, Footer, ListItem } from "native-base";
import { Platform, StyleSheet, View, TextInput, Dimensions, ListView, Image, ScrollView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import DBActions from "../../Store/Actions/DBActions/DBActions";
import FirebaseDB from '../../Store/Firebase/firebaseDB';
import { connect } from "react-redux";
import { StackActions, NavigationActions } from 'react-navigation';

const { height, fontScale, scale, width } = Dimensions.get("window");


class ConfirmOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            flag: false,
        }
    }
    reset = (route) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: `${route}` })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    componentDidMount() {
        // this.props.loadMenu()
        let localArray = [];
        let orders = this.props.navigation.state.params.state;
        orders.forEach((data) => {
            if (data.qty !== 0)
                localArray.push(data);
        });
        this.setState({ orderList: localArray });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.orderPushed === "orderPushed" || nextProps.orderUpdated === "orderUpdated") {
            this.reset('home');
        }
        
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
        if (this.props.setUpdateFlag) {
            let obj = {
                items: this.state.orderList,
            }
            this.props.updateOrder(obj, this.props.tableId, this.props.orderId);
        } else {
            this.props.doneOrder(obj, this.props.tableId);
        }
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
                        <Text style={{ fontSize: fontScale * 12, fontWeight: '700' }}>{`${this.props.tableId} Main Order`}</Text>
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
                        if (item.qty !== 0)
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
        tableId: state.dbReducer.tableID,
        orderId: state.dbReducer.orderID,
        orderPushed: state.dbReducer.orderPushed,
        setUpdateFlag: state.dbReducer.setUpdateFlag,
        orderUpdated: state.dbReducer.orderUpdated,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loadTables: () => dispatch(DBActions.loadTables()),
        loadMenu: () => dispatch(DBActions.loadMenu()),
        doneOrder: (obj, tableId) => dispatch(DBActions.pushDoneOrder(obj, tableId)),
        updateOrder: (obj, tableId, orderId) => dispatch(DBActions.updateOrder(obj, tableId, orderId))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmOrder);
