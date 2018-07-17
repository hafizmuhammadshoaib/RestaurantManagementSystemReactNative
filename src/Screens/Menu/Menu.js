import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Dimensions, Text, StatusBar, FlatList, Button, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Icon, Card, CardItem, Body, Spinner, List, ListItem } from "native-base";
import { connect } from "react-redux";
import AuthActions from '../../Store/Actions/AuthActions/AuthActions';
import DBActions from "../../Store/Actions/DBActions/DBActions";

const { height, fontScale, scale, width } = Dimensions.get("window")


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countingObjects: {},
            prevOrderArray: [],
        }
    }
    countingObjects = {
    }
    orderArray = [];
    prevOrderArray = []
    componentDidMount() {
        this.props.loadMenu();
        prevOrderArray = this.props.navigation.getParam('orderArray');
        this.setState({ prevOrderArray });
        this.checkPrevOrderArray(prevOrderArray)
    }

    checkPrevOrderArray = (prevOrderArray) => {
        if (prevOrderArray) {
            prevOrderArray.forEach(data => {
                data.items.forEach(item => {
                    this.countingObjects[item.item] = {
                        count: parseInt(item.qty),
                        price: parseInt(item.price)
                    }
                })
            })
            this.setState({countingObjects: this.countingObjects});
        }
    }

    itemCounterPlus = (itemName, price) => {
        console.log(this.countingObjects)
        if (this.countingObjects[itemName] == undefined) {
            this.countingObjects[itemName] = {
                count: 1,
                price
            }
        }
        else {
            this.countingObjects[itemName].count = this.countingObjects[itemName].count + 1
        }
        this.setState({ countingObjects: this.countingObjects })
    }

    itemCounterSub = (itemName, price) => {
        if (this.state.countingObjects[itemName] != undefined && this.state.countingObjects[itemName].count != '0') {
            this.countingObjects[itemName].count = this.countingObjects[itemName].count - 1;
        }
        this.setState({ countingObjects: this.countingObjects });
    }



    updateCounter = (data, price) => {
        if (this.countingObjects[data] == undefined) {
            this.countingObjects[data] = {
                count: 1,
                price
            }
        } else {
            this.countingObjects[data].count = this.countingObjects[data].count + 1
        }
        this.setState({ countingObjects: this.countingObjects });
    }

    done = () => {
        if (this.state.countingObjects !== {}) {
            for (i in this.countingObjects) {
                let obj = {
                    item: i,
                    qty: this.countingObjects[i].count,
                    price: this.countingObjects[i].price,
                    status: "queued"
                }
                this.orderArray.push(obj);
            }
        }
        this.props.navigation.navigate('confirmOrder', { state: this.orderArray });
        this.orderArray = [];
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 0.1 }} >
                    <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: "bold" }} >Menu List</Text>
                            <TouchableOpacity onPress={this.done} >
                                <Text style={{ backgroundColor: 'green', padding: 4, color: "#fff", borderRadius: 5, fontSize: fontScale * 10 }}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </CardItem>
                    </Card>
                </View>
                {/* <FlatList
                    extraData={this.state}
                    data={this.props.menu}
                    emoveClippedSubviews={false}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        if(item.menuSection !== undefined)
                        return (
                            <View key={index} style={{ justifyContent: 'space-between', borderWidth: 0 }}>
                                <Text>
                                    {item.menuSection}
                                </Text>
                                {
                                    item.items.map((data, index) => {
                                        return (
                                            <ListItem key={} style={{ justifyContent: 'space-between', borderWidth: 2 }}>
                                                <Text>
                                                    {data.name}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity style={{ padding: 10, backgroundColor: '#eee' }} onPress={() => this.updateCounter(data.name, data.price)}>
                                                        <Text>
                                                            +
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <Text>
                                                        {
                                                            this.state.countingObjects[data.name] === undefined ?
                                                                '0'
                                                                :
                                                                this.state.countingObjects[data.name].count
                                                        }
                                                    </Text>
                                                    <TouchableOpacity style={{ padding: 10, backgroundColor: '#eee' }} onPress={() => this.updateCounter(data.name, data.price)}>
                                                        <Text>
                                                            -
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </ListItem>
                                        )
                                    })
                                }
                                <ListItem>
                                    <Text>
                                    </Text>
                                </ListItem>
                            </View>
                        )
                    }}
                /> */}
                <FlatList data={this.props.menu} extraData={this.state}
                    renderItem={({ item, index }) => <View key={index}
                        style={{ flex: 0.9 }} >
                        <Text style={{ padding: 10, fontWeight: "bold", fontSize: fontScale * 20, backgroundColor: "#FEF8E8" }} > {item.menuSection} </Text>
                        <FlatList data={item.items} extraData={this.state} style={{ backgroundColor: "#ffffff" }}
                            renderItem={({ item, index }) => (<ListItem style={{ justifyContent: "space-between" }} key={index} >
                                <Text>{item.name}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", }} >
                                    <Button onPress={() => { this.itemCounterPlus(item.name, item.price) }} title=" + " color="#BA1F1F" />
                                    <Text style={{ padding: 10, fontWeight: "bold", color: "#CC6C6A" }} > {this.state.countingObjects[item.name] == undefined ? '0' : this.state.countingObjects[item.name].count}</Text>
                                    <Button onPress={() => { this.itemCounterSub(item.name, item.price) }} title=" - " color="#BA1F1F" />
                                </View>
                            </ListItem>)}
                        />
                    </View>
                    }
                />
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
)(Menu);