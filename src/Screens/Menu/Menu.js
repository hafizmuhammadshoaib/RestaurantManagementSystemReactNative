import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Dimensions, Text, StatusBar, FlatList, Button,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Icon, Card, CardItem, Body, Spinner, List, ListItem } from "native-base";
import { connect } from "react-redux";
import AuthActions from '../../Store/Actions/AuthActions/AuthActions';
import DBActions from "../../Store/Actions/DBActions/DBActions";

const { height, fontScale, scale, width } = Dimensions.get("window")


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countingObjects: {},floatButtonHidden:""
        }


    }
    countingObjects = {
    }
    componentDidMount() {
        this.props.loadMenu()
    }
    itemCounterPlus = (itemName, itemPrice) => {
        console.log(this.countingObjects)
        if (this.countingObjects[itemName] == undefined) {
            console.log("inside if", this.countingObjects[itemName])
            this.countingObjects[itemName] = { count: 1, price: itemPrice }
            this.setState({ countingObjects: this.countingObjects })
            console.log("inside if state", this.state.countingObjects)
        }
        else {
            this.countingObjects[itemName].count = this.countingObjects[itemName].count + 1
            console.log("inside else", this.countingObjects[itemName])
            this.setState({ countingObjects: this.countingObjects })
            console.log("inside else state", this.state.countingObjects[itemName])
        }
    }
    itemCounterSub = (itemName) => {
        if (this.countingObjects[itemName] == undefined || this.countingObjects[itemName] == 0);
        // this.countingObjects[itemName] = 0
        // this.setState({ countingObjects: this.countingObjects }
        else {
            this.countingObjects[itemName].count = this.countingObjects[itemName].count - 1;
            this.setState({ countingObjects: this.countingObjects })
        }
    }
   doneCallBack=()=>{
       let array =[]
       for (i in this.state.countingObjects){
           let obj={
               item:i,
               qty:this.state.countingObjects[i].count,
               price:this.state.countingObjects[i].price,
               status:"queued"
               
           }
           array.push(obj)
       }
       this.props.navigation.navigate('confirmOrder',{items:array})
       console.log(array)
    //    return array;
   }


    render() {


        return (

            <View style={{ flex: 1 ,backgroundColor:"cyan"}} >
                <View style={{ flex: 0.1, }} >
                    <Card>
                        <CardItem style={{ justifyContent: "space-between" }} >
                            <Text style={{ fontWeight: "bold" }} >Menu List</Text>
                            <TouchableOpacity onPress={this.doneCallBack}  ><Text style={{color:"#fff",fontSize:fontScale*10,padding:5,borderRadius:5,backgroundColor:"#1EAF7A"}} >Done</Text></TouchableOpacity>                            
                        </CardItem>
                       
                    </Card>
                </View>
                <FlatList data={this.props.menu} extraData={this.state} style={{ flex: 0.9 }} 
                    renderItem={({ item, index }) => <View key={index} >
                        <Text style={{ padding: 10, fontWeight: "bold", fontSize: fontScale * 20, backgroundColor: "#FEF8E8" }} > {item.menuSection} </Text>
                        <FlatList data={item.items} style={{ backgroundColor: "#ffffff" }}
                            renderItem={({ item, index }) => (<ListItem style={{ justifyContent: "space-between" }} key={index} >
                                <Text>{item.name}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", }} >
                                    <Button onPress={() => { this.itemCounterPlus(item.name, item.price) }} title=" + " color="#BA1F1F" />
                                    <Text style={{ padding: 10, fontWeight: "bold", color: "#CC6C6A" }} >{(this.state.countingObjects[item.name] == undefined) ? "0" : this.state.countingObjects[item.name].count}</Text>
                                    <Button title=" - " color="#BA1F1F" onPress={() => { this.itemCounterSub(item.name, item.price) }} />
                                </View>
                            </ListItem>)}
                        />
                    </View>
                    }



                />
                {/* <View style={{ flex: 0.2, alignSelf: "flex-end", flexDirection: "row" }} >
                    <Card>
                        <CardItem style={{ backgroundColor: 'cyan', justifyContent: "flex-end" }} > */}
                            {/* <View style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 100,
                                height: 100,
                                backgroundColor: '#fff',
                                borderRadius: 100,
                                position:"absolute",
                                top:height*0.75,
                                marginLeft:width*0.75
                            }} >
                                <Button title="" />
                            </View> */}
                        {/* </CardItem>
                    </Card>
                </View> */}

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