import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, AsyncStorage, Alert, Animated } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import { Entypo, AntDesign } from '@expo/vector-icons';

import { SwipeListView} from 'react-native-swipe-list-view';

export default class HomeScreen extends React.Component{

    rowSwipeAnimatedValues = {};

    state = {
        cityData: [],
    }
    
    static navigationOptions ={
        title: "Weather API"
    }

    componentDidMount(){
        const {navigation} = this.props;
        navigation.addListener("willFocus", () => {
            this.getAllCityData();
        })
        Array(20).fill('').forEach((_, i) => {
			this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		});
    }

    getAllCityData = async() => {
        await AsyncStorage.getAllKeys()
        .then( (keys) =>{
            return AsyncStorage.multiGet(keys)
            .then((result)=> {
                this.setState({
                    cityData: result
                })
            })
            .catch( error => console.log(error))
        })
        .catch( error => console.log(error))
        console.log(this.state.data);
    }

    deleteCity = key => {
        Alert.alert(
            "Delete City Data?",
            `${this.state.cityName}`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("cancel tap")
                },
                {
                    text: "Ok",
                    onPress: async()=>{
                        await AsyncStorage.removeItem(key)
                        .then()
                        .catch( error=> console.log(error))
                    }
                }
            ]
        )
    }



    
    
    render(){
        return (           
                <View style={styles.container}>
                    <SwipeListView
                    useFlatList = {true}
                    data = {this.state.cityData}
                    renderItem = { ({item}) => {
                        console.log(item);
                        data = JSON.parse(item[1]);
                        return (
                            
                                <TouchableOpacity
                                onPress = { () => {
                                    this.props.navigation.navigate("View", {
                                        key: item[0].toString()
                                    })
                                }}>
                                    <Card style={styles.listItem}>
                                        <View style={styles.container}>
                                            <Text>{data.cityName}</Text>
                                            <Text>{data.cod}</Text>
                                        </View>                                  
                                    </Card>
                                </TouchableOpacity>
                           
                        )
                    }}
                    renderHiddenItem = { ({item}) => {
                        console.log("This is item" + item);
                        
                        thisdata = {
                            key: item[0],
                        };
                        return (
                        <CardItem style={styles.actionButton} >
                            <TouchableOpacity
                            onPress = { () => {
                                this.deleteCity(item[0].toString());
                            }}
                            style={[{transform: [
                                {
                                    scale: this.rowSwipeAnimatedValues['1'].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                }
                            ]}]}
                            >
                                <Entypo
                                name = "trash"
                                size = {50}
                                color ="#74B9FF"
                                />
                            </TouchableOpacity>
                        </CardItem>
                    )}
                }         
                    keyExtractor = { (item, index) => item[0].toString()}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    />

                    <TouchableOpacity
                    style = {styles.floatButton}
                    onPress = { () => {
                        this.props.navigation.navigate("Search")
                    }}
                    >
                        <AntDesign
                        name="search1"
                        size = {30}
                        color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
                    
          );
    }
}
  


const styles = StyleSheet.create({
    newContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listItem: {
        flexDirection: "row",
        padding: 20,
    },
    contactIcon: {
        width: 60, 
        height: 60,
        borderRadius: 100,
    },
    infoContainer: {
        flexDirection: "column",
    },
    infoText: {
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 10,
        paddingTop: 2,
    },
    floatButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: "#74B9FF",
        borderRadius: 100,
    },
    actionButton:{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        
    }
  
});
