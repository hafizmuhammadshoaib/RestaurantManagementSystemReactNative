import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Card, CardItem, Container, Header, Content, Tab, Tabs, List, ListItem, Icon, Button } from "native-base";
// const { width, height, fontScale, scale } = Dimensions.get('window');
let tableName = undefined;
const { height, fontScale, scale, width } = Dimensions.get("window");
import DBActions from "../../Store/Actions/DBActions/DBActions";
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

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
        this.props.setTableId(tableName);
        tableIndex = this.props.tables.findIndex(element => tableName === element.key);
        orderKeyArray = Object.keys(this.props.tables[tableIndex].Orders);
        orderArray = Object.values(this.props.tables[tableIndex].Orders);
        tempArrayOrder = [];
        tempArraykeyOrder=[];
        tempArrayOrder.push(orderArray[0]);
        tempArraykeyOrder.push(orderKeyArray[0])
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
                <View>
                    <Svg height="100"
                width="100">
                    <Polygon style="fill:#D03B00;" points="475.861,0 348.335,0 235.985,20.015 256,480.105 475.861,480.105 "/>
<Polygon style="fill:#E27726;" points="36.139,0 36.139,480.105 256,480.105 256,20.015 163.665,0 "/>
<Polygon style="fill:#EFE2DD;" points="412.124,63.738 256,63.738 235.985,287.868 256,512 412.124,512 "/>
<Rect x="99.875" y="63.738" style="fill:#FFF5F5;" width="156.123" height="448.259"/>
<Polygon style="fill:#B4D2D7;" points="348.335,0 256,0 235.985,47.816 256,95.633 348.335,95.633 "/>
<Rect x="163.662" style="fill:#E1EBF0;" width="92.336" height="95.636"/>
<Path style="fill:#56C225;" d="M263.909,288.816h-15.817c-15.284,0-27.72-12.435-27.72-27.72s12.435-27.72,27.72-27.72h15.817
	c15.284,0,27.72,12.435,27.72,27.72h29.999c0-29.424-22.137-53.758-50.628-57.267v-33.293h-29.999v33.293
	c-28.491,3.509-50.628,27.843-50.628,57.267c0,31.826,25.893,57.718,57.718,57.718h15.817c15.284,0,27.72,12.435,27.72,27.721
	c0,15.284-12.435,27.72-27.72,27.72h-15.817c-15.284,0-27.72-12.435-27.72-27.72h-29.999c0,29.424,22.137,53.758,50.628,57.267
	v33.293h29.999v-33.293c28.491-3.509,50.628-27.843,50.628-57.267C321.627,314.709,295.734,288.816,263.909,288.816z"/>
<G>
</G>
<G>
</G>
<G>
</G>
<G>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
                    </Svg>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', height: height * 1 / 20, marginRight: width * 1 / 15 }} onPress={() => { navigation.navigate('menu', { orderArray: this.orderArray }) }}>
                        <Text style={{ fontSize: fontScale * 50, fontWeight: "bold", color: "#fff" }} >+</Text>
                    </TouchableOpacity>
                </View>
            ),

        };
    };
    // navigateToMenu = () => {
    //     this.props.navigation.navigate('menu', { orderArray: this.orderArray })
    // }


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
                <FlatList
                    style={{ flex: 2 }}
                    horizontal={true}
                    data={tempArrayOrder}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        this.props.setOrderId(tempArraykeyOrder[index]);
                        return (
                            <TouchableOpacity onPress={() => this.setOrderId(tempArraykeyOrder[index])} style={{ width: width * 0.5, height: height * 0.38 }}>
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
                                                    {tempArraykeyOrder[index]}
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
                        <Tabs>
                            <Tab activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }} heading="ALL">
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
                                                                    <Text style={[styles.statusStyle, { backgroundColor: color[item.status] }]}>{item.status}</Text>
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
                            </Tab>
                            <Tab heading="Queued" activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }}>
                                <View style={{ flex: 1 }}>
                                    <List>
                                        {
                                            this.props.tables[tableIndex].Orders[this.state.orderId].items.map(item => {
                                                // orderArray[0].items.map(item => {
                                                if (item.status === 'queued') {
                                                    return (
                                                        <ListItem>

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
                                            })
                                        }
                                    </List>
                                </View>
                            </Tab>
                            <Tab heading="Cooking" activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }}>
                                <View style={{ flex: 1 }}>
                                    <List>
                                        {
                                            this.props.tables[tableIndex].Orders[this.state.orderId].items.map(item => {
                                                // orderArray[0].items.map(item => {
                                                if (item.status === 'cooking') {
                                                    return (
                                                        <ListItem>

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
                                            })
                                        }
                                    </List>
                                </View>
                            </Tab>
                            <Tab heading="Deliverd" activeTabStyle={{ backgroundColor: 'red' }} tabStyle={{ backgroundColor: 'red' }} textStyle={{ color: '#fff' }}>
                                <View style={{ flex: 1 }}>
                                    <List>
                                        {
                                            this.props.tables[tableIndex].Orders[this.state.orderId].items.map(item => {
                                                // orderArray[0].items.map(item => {
                                                if (item.status === 'delivered') {
                                                    return (
                                                        <ListItem>

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
                                            })
                                        }
                                    </List>
                                </View>
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
        // setTableId: (tableId) => dispatch(DBActions.setTableID(tableId)),
        setOrderId: (orderId) => dispatch(DBActions.setOrderID(orderId)),
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