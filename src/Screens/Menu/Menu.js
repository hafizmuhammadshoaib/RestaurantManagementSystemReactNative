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
    shouldComponentUpdate(newProps,newState){
        console.log("newProps",newProps);
        console.log("newState",newState);
        return true;
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
                <List dataArray={this.props.menu} extraData={this.state} 
                    renderRow={(item, sectionID, rowID, higlightRow) => <View key={rowID} >
                        <Text style={{ padding: 10, fontWeight: "bold", fontSize: fontScale * 20, backgroundColor: "#FEF8E8" }} > {item.menuSection} </Text>
                        <List dataArray={item.items} style={{ backgroundColor: "#ffffff" }}
                            renderRow={(item, sectionID, rowID, higlightRow) => (<ListItem style={{ justifyContent: "space-between" }} key={rowID} >
                                <Text>{item.name}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", }} >
                                    <Button onPress={()=>{this.itemCounterPlus(item.name)}} title=" + " color="#BA1F1F" />
                                    <Text style={{ padding: 10, fontWeight: "bold", color: "#CC6C6A" }} >{`item: ${this.state.countingObjects[item.name]}`}</Text>
                                    <Button title=" - " color="#BA1F1F" />
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