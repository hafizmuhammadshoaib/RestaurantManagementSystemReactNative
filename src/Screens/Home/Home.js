import React, { Component } from 'react';
import { Container, Header, Content, Form, Input, Text, Item, Button, Card, CardItem, Left, Body, Right, Footer } from "native-base";
import { Platform, StyleSheet, View, TextInput, Dimensions, ListView, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/FontAwesome";
import DBActions from "../../Store/Actions/DBActions/DBActions";
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';

const { height, fontScale, scale, width } = Dimensions.get("window");

const colors = {
    free: ['#5ab38c', '#5bb07a', '#57a564'],
    occupied: ['#1087cb', '#006eb4', '#025799'],

}

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.loadTables();
        // this.props.loadMenu()
    }

    render() {
        console.log(this.props.tables)
        return (
            <View style={{ flex: 1 }} >
                <StatusBar backgroundColor="#B71D1D" />
                <ScrollView style={{ flexWrap: "wrap", height: height }} >
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap', flex: 1
                    }} >
                        {
                            (!this.props.tables) ? null :
                                this.props.tables.map((value, index) => {
                                    console.log('value: ***************/////**', value);
                                    return (
                                        <LinearGradient colors={colors[value.status]} style={[{margin: width * 0.01, borderRadius: 5}, styles.containerStyle]}>
                                            <TouchableOpacity key={index} style={{ width: width * 0.47, height: height * 0.35 }} onPress={() => { this.props.navigation.navigate(value.status == 'occupied' ? 'order' : 'menu', { tableName: value.key }) }}>
                                                <View >
                                                    <View style={{ justifyContent: "center", shadowColor: "#C3C5C7", }} >
                                                        <Text style={{ alignSelf:'center',color: '#fff', fontSize: fontScale * 30, fontWeight: "bold", padding: 10 }}  >{value.key}</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            borderBottomColor: '#D5D5D5',
                                                            borderBottomWidth: 1,
                                                            width: "90%",
                                                            alignSelf: "center"
                                                        }}
                                                    />
                                                    <View style={{ padding:  fontScale * 15, margin: 0, flexDirection: 'row', justifyContent: "space-between", }} >
                                                        <Image source={require('./seat.png')} />
                                                        <View style={{ paddingRight: fontScale * 25 }}>
                                                            <Text style={{ color: '#fff' }}>Total</Text>
                                                            <Text style={{ color: '#fff', fontSize: fontScale * 15, fontWeight: "bold", alignSelf: 'flex-start' }} >{`Seats ${value.seats}`}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ padding: fontScale * 15, margin: 0, flexDirection: 'row', justifyContent: "space-between" }}>
                                                        <Image source={require('./timer.png')} />
                                                        <View  >
                                                            <Text style={{ color: '#fff' }}>Free Since</Text>
                                                            <Text style={{ color: '#fff', fontSize: fontScale * 15, fontWeight: "bold" }} >10:08 PM</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        </LinearGradient>

                                    )
                                })
                        }

                    </View>
                </ScrollView>
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
)(Home);
const styles = StyleSheet.create({
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
  })