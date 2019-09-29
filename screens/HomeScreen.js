import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, AsyncStorage, Alert } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import { Entypo } from '@expo/vector-icons';

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
                renderItem = { ({item}) => {
                    console.log(item);
                    data = JSON.parse(item[1]);
                    return (
                        <TouchableOpacity
                        onPress = { () => {
                            this.props.navigation.navigate("View", {
                                key: item[0].toString()
                            })
                        }}
                        >
                            <Card style={styles.listItem}>
                                <View style={styles.container}>
                                    <Text>{data.cityName}</Text>
                                    <Text>{data.cod}</Text>
                                </View>
                                <CardItem style={styles.actionButton} bordered>
                                    <TouchableOpacity
                                    onPress = { () => {
                                        this.deleteCity(item[0].toString());
                                    }}
                                    >
                                        <Entypo
                                        name = "trash"
                                        size = {50}
                                        color ="#74B9FF"
                                        />
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>

                        </TouchableOpacity>
                    )
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
    }
  
});
