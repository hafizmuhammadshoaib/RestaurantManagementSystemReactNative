import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Dimensions, Text, StatusBar, FlatList, Button } from 'react-native';
import { Container, Header, Content, Form, Input, Item, Icon, Card, CardItem, Body, Spinner, List, ListItem } from "native-base";
import { connect } from "react-redux";
import AuthActions from '../../Store/Actions/AuthActions/AuthActions';
import DBActions from "../../Store/Actions/DBActions/DBActions";

const { height, fontScale, scale, width } = Dimensions.get("window")


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state={
            countingObjects:{}
        }
    }
    componentDidMount() {
        this.props.loadMenu()
    }
    countingObjects={

    }
    itemCounterPlus=(itemName)=>{
        console.log(this.countingObjects)
        if(this.countingObjects[itemName]==undefined){
            console.log("inside if",this.countingObjects[itemName])
            this.countingObjects[itemName]=1
            this.setState({countingObjects:this.countingObjects})
            console.log("inside if state",this.state.countingObjects)
        }
        else{
            this.countingObjects[itemName]=this.countingObjects[itemName]+1
            console.log("inside else",this.countingObjects[itemName])
            this.setState({countingObjects:this.countingObjects})
            console.log("inside else state",this.state.countingObjects[itemName])
        }
    }
    itemCounterSub=(itemName)=>{
        if(this.countingObjects[itemName]==undefined || this.countingObjects[itemName]==0){
            this.countingObjects[itemName]=0
            this.setState({countingObjects:this.countingObjects})
        }
        else{
            this.countingObjects[itemName]=this.countingObjects[itemName]-1;
            this.setState({countingObjects:this.countingObjects})
        }
    }
    

    render() {


        return (

            <View style={{ flex: 1 }} >
                <View style={{flex:0.08 }} >
                    <Card>
                        <CardItem style={{justifyContent:"center"}} >
                            <Text style={{fontWeight:"bold"}} >Menu List</Text>
                        </CardItem>
                    </Card>
                </View>
                <FlatList data={this.props.menu} extraData={this.state} 
                    renderItem={({item, index}) => <View key={index} >
                        <Text style={{ padding: 10, fontWeight: "bold", fontSize: fontScale * 20, backgroundColor: "#FEF8E8" }} > {item.menuSection} </Text>
                        <FlatList data={item.items} style={{ backgroundColor: "#ffffff" }}
                            renderItem={({item,index}) => (<ListItem style={{ justifyContent: "space-between" }} key={index} >
                                <Text>{item.name}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", }} >
                                    <Button onPress={()=>{this.itemCounterPlus(item.name)}} title=" + " color="#BA1F1F" />
                                    <Text style={{ padding: 10, fontWeight: "bold", color: "#CC6C6A" }} >{(this.state.countingObjects[item.name]==undefined)?"0":this.state.countingObjects[item.name]}</Text>
                                    <Button title=" - " color="#BA1F1F" onPress={()=>{this.itemCounterSub(item.name)}} />
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