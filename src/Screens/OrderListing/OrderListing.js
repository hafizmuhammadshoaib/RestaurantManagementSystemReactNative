import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, ImageBackground, Dimensions, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Container, Header, Content, Tab, Tabs, List, ListItem, Icon, Button } from "native-base";
// const { width, height, fontScale, scale } = Dimensions.get('window');
let tableName = undefined;
const { height, fontScale, scale, width } = Dimensions.get("window");
import DBActions from "../../Store/Actions/DBActions/DBActions";
import LinearGradient from 'react-native-linear-gradient';

const color = {
    'cooking': '#f7a928',
    'queued': '#57a665',
    'delivered': '#b33d27'
}

const colors = {
    free: ['#5ab38c', '#5bb07a', '#57a564'],
    occupied: ['#1087cb', '#006eb4', '#025799'],
}

class OrderListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // table: this.props.navigation.getParam('tableName')
            orderId: undefined
        }
        tableName = this.props.navigation.getParam('tableName');
        this.props.setTableId(tableName);
        console.log('this.props.setTableId(tableName): ', tableName)
        tableIndex = this.props.tables.findIndex(element => tableName === element.key);
        orderKeyArray = Object.keys(this.props.tables[tableIndex].Orders);
        orderArray = Object.values(this.props.tables[tableIndex].Orders);
        tempArrayOrder = [];
        tempArraykeyOrder = [];
        tempArrayOrder.push(orderArray[0]);
        tempArraykeyOrder.push(orderKeyArray[0]);
        this.pullHistory(tempArrayOrder);
    }

    historyKeys = [];
    historyValues = [];

    pullHistory = (tempArray) => {
        if (tempArray) {
            tempArray.forEach(data => {
                this.historyKeys = Object.keys(data.history);
                this.historyValues = data.history;
                console.log(this.historyKeys, this.historyValues);
            })
        }
    }

    componentDidMount() {
        this.props.setUpdateFlag();
    }

    static navigationOptions = {

        headerStyle: {
            backgroundColor: '#212121',
            width: width * 1
        },


    }


    static navigationOptions = ({ navigation }) => {
        console.log(this);
        return {
            title: navigation.getParam('tableName'),
            // headerRight: (
            //     // <Icon style={{ color: "#2DB586" }} active name="dot-circle-o" />
            // ),
            headerRight: (
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "space-between" }}  >
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', height: height * 1 / 20, marginRight: width * 1 / 15 }} onPress={() => { navigation.navigate('Bill', { orderArray: this.tempArrayOrder }) }} >
                        <Image source={require('./bill.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', height: height * 1 / 20, marginRight: width * 1 / 15 }} onPress={() => { navigation.navigate('menu', { orderArray: this.orderArray }) }}>
                        <Text style={{ fontSize: fontScale * 50, fontWeight: "bold", color: "#fff" }} >+</Text>
                    </TouchableOpacity>
                </View>
            ),
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
        // tableName = `${this.props.navigation.getParam('tableName')}`;
        // alert(orderArray)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.3 }}>

                    <FlatList
                        style={{ flex: 2 }}
                        horizontal={true}
                        data={tempArrayOrder}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            this.props.setOrderId(tempArraykeyOrder[index]);
                            return (
                                <LinearGradient colors={['#5ab38c', '#5bb07a', '#57a564']} style={[{ width: width * 0.4, height: height * 0.38, margin: height * 1 / 50 }, styles.containerStyle]}>
                                    <TouchableOpacity key={index} onPress={() => this.setOrderId(tempArraykeyOrder[index])} style={{ width: width * 0.5, height: height * 0.38 }}>
                                        <View style={{ width: width * 0.5, height: height * 0.38 }}>
                                            <View style={{ padding: height * 1 / 55 }}>
                                                <Text style={{ color: '#b0e4d8' }}>
                                                    Created
                                                    </Text>
                                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                                    {this.formatAMPM(new Date(item.timeCreated))}
                                                </Text>
                                            </View>
                                            <View style={{ padding: height * 1 / 55 }}>
                                                <Text style={{ color: '#b0e4d8' }}>
                                                    Estimat Time
                                                </Text>
                                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                                    {this.formatAMPM(new Date(item.ETA))}
                                                </Text>
                                            </View>
                                            <View style={{flex: 1, paddingLeft: height * 1 / 55 }}>
                                                <Text style={{ backgroundColor: '#5db88b', color: '#fff', fontWeight: 'bold', width: width * 1 / 5, textAlign: 'center', borderRadius: 5 }}>
                                                    {item.status}
                                                </Text>
                                            </View>
                                            {/* <View
                                            >
                                                <Text>
                                                    {tempArraykeyOrder[index]}
                                                </Text>
                                            </View> */}
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>
                                // <TouchableOpacity onPress={() => this.setOrderId(tempArraykeyOrder[index])} style={{ width: width * 0.5, height: height * 0.38 }}>

                                // </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                {
                    this.state.orderId === undefined ?
                        null
                        :
                        <View style={{ flex: 0.7, marginTop: height * 1 / 50 }}>
                            <Tabs>
                                <Tab activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }} heading="ALL">
                                    <View style={{ flex: 1 }}>
                                        <FlatList
                                            data={this.props.tables[tableIndex].Orders[this.state.orderId].items}
                                            keyExtractor={(item, index) => index}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <ListItem key={index}>
                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <View>
                                                                <Text>Item:  {item.item}</Text>
                                                                <View style={{ alignSelf: 'flex-start' }}>
                                                                    <Text style={[styles.statusStyle, { backgroundColor: color[item.status] }]}>{item.status}</Text>
                                                                </View>
                                                            </View>
                                                            <View>
                                                                <Text>Qty {item.qty}</Text>
                                                            </View>
                                                        </View>
                                                    </ListItem>
                                                )
                                            }
                                            }
                                        />
                                    </View>
                                </Tab>
                                <Tab heading="Queued" activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }}>
                                    <View style={{ flex: 1 }}>
                                        <FlatList
                                            data={this.props.tables[tableIndex].Orders[this.state.orderId].items}
                                            keyExtractor={(item, index) => index}
                                            renderItem={({ item, index }) => {
                                                // orderArray[0].items.map(item => {
                                                if (item.status === 'queued') {
                                                    return (
                                                        <ListItem key={index}>
                                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View>
                                                                    <Text>Item:  {item.item}</Text>
                                                                    <View style={{ alignSelf: 'flex-start' }}>
                                                                        <Text style={[styles.statusStyle, { backgroundColor: color[item.status] }]}>{item.status}</Text>
                                                                    </View>
                                                                </View>
                                                                <View>
                                                                    <Text>Qty {item.qty}</Text>
                                                                </View>
                                                            </View>
                                                        </ListItem>
                                                    )
                                                }
                                            }
                                            }
                                        />
                                    </View>
                                </Tab>
                                <Tab heading="Cooking" activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }}>
                                    <View style={{ flex: 1 }}>
                                        <FlatList
                                            data={this.props.tables[tableIndex].Orders[this.state.orderId].items}
                                            keyExtractor={(item, index) => index}
                                            renderItem={({ item, index }) => {
                                                // orderArray[0].items.map(item => {
                                                if (item.status === 'cooking') {
                                                    return (
                                                        <ListItem key={index}>
                                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View>
                                                                    <Text>Item:  {item.item}</Text>
                                                                    <View style={{ alignSelf: 'flex-start' }}>
                                                                        <Text style={[styles.statusStyle, { backgroundColor: color[item.status] }]}>{item.status}</Text>
                                                                    </View>
                                                                </View>
                                                                <View>
                                                                    <Text>Qty {item.qty}</Text>
                                                                </View>
                                                            </View>
                                                        </ListItem>
                                                    )
                                                }
                                            }
                                            }
                                        />
                                    </View>
                                </Tab>
                                <Tab heading="History" activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }}>
                                    <View style={{ flex: 1 }}>
                                        <FlatList
                                            data={this.historyKeys}
                                            keyExtractor={(item, index) => index}
                                            renderItem={({ item, index }) => {
                                                console.log('item %%%%%%%%%%% ', this.historyValues[item]);
                                                return (
                                                    <FlatList
                                                        data={this.historyValues[item]}
                                                        keyExtractor={(item, index) => index}
                                                        renderItem={({ item, index }) => {
                                                            // orderArray[0].items.map(item => {
                                                            console.log('item %%%%%%%%%%% ', item);
                                                            if (true) {
                                                                return (
                                                                    <ListItem key={index}>
                                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                            <View>
                                                                                <Text>Item:  {item.item}</Text>
                                                                                <View style={{ alignSelf: 'flex-start' }}>
                                                                                    <Text style={[styles.statusStyle, { backgroundColor: color[item.status] }]}>{item.status}</Text>
                                                                                </View>
                                                                            </View>
                                                                            <View>
                                                                                <Text>Qty {item.qty}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </ListItem>
                                                                )
                                                            }
                                                        }
                                                        }
                                                    />
                                                )
                                            }
                                            }
                                        />
                                    </View>
                                </Tab>
                                <Tab heading="Deliverd" activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }}>
                                    <View style={{ flex: 1 }}>
                                        <FlatList
                                            data={this.props.tables[tableIndex].Orders[this.state.orderId].items}
                                            keyExtractor={(item, index) => index}
                                            renderItem={({ item, index }) => {
                                                // orderArray[0].items.map(item => {
                                                if (item.status === 'delivered') {
                                                    return (
                                                        <ListItem key={index}>
                                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View>
                                                                    <Text>Item:  {item.item}</Text>
                                                                    <View style={{ alignSelf: 'flex-start' }}>
                                                                        <Text style={[styles.statusStyle, { backgroundColor: color[item.status] }]}>{item.status}</Text>
                                                                    </View>
                                                                </View>
                                                                <View>
                                                                    <Text>Qty {item.qty}</Text>
                                                                </View>
                                                            </View>
                                                        </ListItem>
                                                    )
                                                }
                                            }
                                            }
                                        />
                                    </View>
                                </Tab>

                            </Tabs>
                        </View>
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
        setTableId: (tableId) => dispatch(DBActions.setTableID(tableId)),
        setOrderId: (orderId) => dispatch(DBActions.setOrderID(orderId)),
        setUpdateFlag: () => dispatch(DBActions.setUpdateFlag()),
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
    containerStyle: {
        borderWidth: width * 0.001,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    }
});