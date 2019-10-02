import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import { Entypo } from '@expo/vector-icons';


import { FlatList, RectButton } from 'react-native-gesture-handler';

import ObjectSwipeableRow from './ObjectSwipeableRow';

//import Swipeable from 'react-native-swipeable-row';

import { useSwipeable, Swipeable } from 'react-swipeable';

import Icon from 'react-native-vector-icons/MaterialIcons';
  
// function rightButtons () {
//     return [
//     <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
//     <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
//   ];
// }

// const leftContent = <Text>Pull to activate</Text>;

// const rightButtons = [
//     <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
//     <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
//   ];



  
const Row = ({ item }) => {
    console.log(item);
    data = JSON.parse(item[1]);
    return (
    <RectButton style={styles.rectButton} onPress={() => alert(item.from)}>
        <Card style={styles.listItem}>
            <View style={styles.container}>
                <Text>{data.cityName}</Text>
                <Text>{data.cod}</Text>
            </View>                    
        </Card>
    </RectButton>
    );
    };
  
  const SwipeableRow = ({item, index}) => {
    return (
        <ObjectSwipeableRow>
          <Row item={item} />
        </ObjectSwipeableRow>
    );
  };


export default class HomeScreen extends React.Component{

    state = {
        cityData: []
    }
    
    static navigationOptions ={
        title: "Weather API"
    }

    componentDidMount(){
        const {navigation} = this.props;
        navigation.addListener("willFocus", () => {
            this.getAllCityData();
        })
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
                    <FlatList
                    data = {this.state.cityData}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem = { ({item}) => {
                        // data = JSON.parse(item[1]);
                        return (
                            <SwipeableRow
                            item={item}
                            />  
                        );                  
                    }}
                    keyExtractor = { (item, index) => item[0].toString()}
                    />



                    <TouchableOpacity
                    style = {styles.floatButton}
                    onPress = { () => {
                        this.props.navigation.navigate("Add")
                    }}
                    >
                        <Entypo
                        name="plus"
                        size = {30}
                        color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
            
          );
    }
}
  


const styles = StyleSheet.create({
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
    rightAction: {
        alignItems: 'flex-end',
        backgroundColor: '#dd2c00',
        flex: 1,
        justifyContent: 'center',
      },
      actionIcon: {
        width: 30,
        marginHorizontal: 10,
      },
      rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'white',
      },
      separator: {
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth,
      },
      fromText: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
      },
      messageText: {
        color: '#999',
        backgroundColor: 'transparent',
      },
      dateText: {
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 20,
        top: 10,
        color: '#999',
        fontWeight: 'bold',
      },

  
});
