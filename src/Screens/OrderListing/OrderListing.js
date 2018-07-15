import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Card, CardItem, Container, Header, Content, Tab, Tabs, List, ListItem } from "native-base";
const { width, height } = Dimensions.get('window');
let tableName = undefined;

const color = {
    'cooking': '#f7a928',
    'queued': '#57a665',
    'delivered': '#b33d27'
}

class OrderListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // table: this.props.navigation.getParam('tableName')
            orderId: undefined
        }
        tableName = this.props.navigation.getParam('tableName');
        tableIndex = this.props.tables.findIndex(element => tableName === element.key);
        orderArray = Object.values(this.props.tables[tableIndex].Orders);
        orderKeyArray = Object.keys(this.props.tables[tableIndex].Orders);
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#212121',
            width: width * 1
        }
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('tableName')
        };
    };


    formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    setOrderId = (orderId) => {
        this.setState({ orderId: orderId });
    }

    render() {
        i = 0;
        // tableName = `${this.props.navigation.getParam('tableName')}`;
        // alert(orderArray)
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 2 }}
                    horizontal={true}
                    data={orderArray}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.setOrderId(orderKeyArray[index])} style={{ width: width * 0.5, height: height * 0.38 }}>
                                <View style={{ width: width * 0.5, height: height * 0.38 }}>
                                    <Card >
                                        <CardItem>
                                            <View>
                                                <Text>
                                                    Created
                                                </Text>
                                                <Text>
                                                    {this.formatAMPM(new Date(item.timeCreated))}
                                                </Text>
                                            </View>
                                        </CardItem>
                                        <CardItem>
                                            <View>
                                                <Text>
                                                    Estimat Time
                                                </Text>
                                                <Text>
                                                    {this.formatAMPM(new Date(item.ETA))}
                                                </Text>
                                            </View>
                                        </CardItem>
                                        <View
                                            style={{
                                                borderBottomColor: '#D5D5D5',
                                                borderBottomWidth: 1,
                                                width: "90%",
                                                alignSelf: "center"
                                            }}
                                        >
                                            <CardItem>
                                                <View>
                                                    <Text>
                                                        Status
                                                </Text>
                                                    <Text>
                                                        {item.status}
                                                    </Text>
                                                </View>
                                            </CardItem>
                                        </View>
                                        <CardItem>
                                            <View
                                            >
                                                <Text>
                                                    {orderKeyArray[i++]}
                                                </Text>
                                            </View>
                                        </CardItem>
                                    </Card>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                {
                    this.state.orderId === undefined ?
                        null
                        :
                        <Tabs >
                            <Tab activeTabStyle={{backgroundColor: 'red'}} tabStyle={{backgroundColor: 'red'}} textStyle={{color: '#fff'}} heading="ALL">
                                <View style={{ flex: 1 }}>
                                    {
                                        this.props.tables[tableIndex].Orders[this.state.orderId].items.map(item => {
                                            // orderArray[0].items.map(item => {
                                            return (
                                                <List>
                                                    <ListItem>

                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View>
                                                                <Text>Item:  {item.item}</Text>
                                                                <View style={{ alignSelf: 'flex-start' }}>
                                                                    <Text style={[styles.statusStyle, {backgroundColor: color[item.status]}]}>{item.status}</Text>
                                                                </View>
                                                            </View>
                                                            <View>
                                                                <Text>Qty {item.qty}</Text>
                                                            </View>
                                                        </View>
                                                    </ListItem>
                                                </List>
                                            )
                                        })
                                    }
                                </View>
                                <View>

                                </View>
                            </Tab>
                            <Tab heading="Tab2" activeTabStyle={{backgroundColor: 'red'}} tabStyle={{backgroundColor: 'red'}} textStyle={{color: '#fff'}}>
                                <Text>
                                    Tab1
                                </Text>
                            </Tab>
                            <Tab heading="Tab3" activeTabStyle={{backgroundColor: 'red'}} tabStyle={{backgroundColor: 'red'}} textStyle={{color: '#fff'}}>
                                <Text>
                                    Tab1
                                </Text>
                            </Tab>
                        </Tabs>
                }
            </View>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        tables: state.dbReducer.tables,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListing)

const styles = StyleSheet.create({
    statusStyle: {
        color: '#fff',
        backgroundColor: "#f7a825",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 3,
        marginTop: 7,
        // fontWeight: '600'
    },
});