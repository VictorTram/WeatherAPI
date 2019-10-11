import React from 'react';
import {StyleSheet, Text, View,Button, TouchableOpacity, AsyncStorage } from 'react-native';

import { Entypo, AntDesign } from '@expo/vector-icons';

import {secretApiKey} from '../config';

import Weather from '../components/Weather';
import {dummyData} from '../utils/dummyWeatherData';


export default class Minimal extends React.Component{
    state = {
        isLoading: true,
        favorites: {},
        temperature: 0,
        weatherCondition: null,
        city: "",
        error: null,
        saved: true,
        liked: "heart",
    }

    static navigationOptions = {
        title: "Minimal"
    }

    // componentDidUpdate = async() =>{
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //             //this.getWeatherData(position.coords.latitude, position.coords.longitude);
    //         },
    //         error => {
    //             this.setState({
    //                 error: "Error Getting the Weather Conditions",
    //             });
    //         }
    //     );
    //     const {navigation} = this.props;
    //     const city= navigation.getParam('city', 'Tokyo');
    //     console.log("This is minimal");
    //     if(city!== ''){
    //         this.setState({
    //             city: city,
    //             temperature: dummyData[city].main.temp,
    //             weatherCondition: dummyData[city].weather[0].main,
    //             isLoading: false,
    //         })
    //     }

    // }

    componentWillMount(){
        const {navigation} = this.props;
        const city= navigation.getParam('city', 'Tokyo');
        navigation.addListener("willFocus", () => {
            this.getAllFavorites();
        });
        this.setState({
                        city: city,
                        temperature: dummyData[city].main.temp,
                        weatherCondition: dummyData[city].weather[0].main,
                        isLoading: false,
                    })
    }

    // Deprecate 
    getAllFavorites = async() => {
        await AsyncStorage.getAllKeys()
        .then( (keys) =>{
            return AsyncStorage.multiGet(keys)
            .then((result)=> {
                this.setState({
                    favorites: result
                })
            })
            .catch( error => console.log(error))
        })
        .catch( error => console.log(error))
        console.log(this.state.favorites);
    }

    // Deprecate ? Could change to 'Toggle Saved'
    unlike = key => {
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

    toggleSaved(){
        if(this.state.liked == 'heart'){
            this.setState({
                liked: "hearto"
            })
        } else{
            this.setState({
                liked: "heart"
            })
        }
    }

    // getWeatherData = (lat, lon) => {
    //     return (
    //       fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${secretApiKey}`)
    //       .then( response => response.json())
    //       .then( responseJson => {
    //         this.setState({
    //           isLoading: false,
    //           temperature: responseJson.main.temp,
    //           weatherCondition: responseJson.weather[0].main,
    //         });
    //         // console.log("API Response " + this.state.apiResponse);
    //         // console.log("responseJson " + JSON.stringify(responseJson));     
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    //     )
    //   }

    render () {
        const { isLoading, city, weatherCondition, temperature, favorites } = this.state;
        if(Object.keys(favorites).length === 0 && (this.props.navigation.getParam('isLoading', true))){
            //this.props.navigation.navigate("Search");
            return (
                <View>
                    <Text> Please search for a City to view</Text>
                    <Button
                    title="Search"
                    onPress={()=> this.props.navigation.navigate("Search")}
                    />
                </View>
            )      
        }
        // if( isLoading ){
        //     return (
        //         <View>
        //             <Text> Fetching the Weather</Text>
        //         </View>
        //     )
        // }
        console.log("condition"+weatherCondition)
        return (
            <View style={styles.container}>               
                <Weather city={city} weather={weatherCondition} temperature={temperature} />
                {/* <Weather weather={weatherCondition} temperature={temperature}/> */}
                <TouchableOpacity
                    style = {styles.likeButton}
                    onPress = { () => {
                        // unlike(key);
                        this.toggleSaved();
                    }}
                    >            
                        <AntDesign
                        name={this.state.liked}
                        size = {30}
                        color="#FFF"
                        />
                </TouchableOpacity>
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
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    likeButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        top: 10,
        right: 10,
        height: 60,
        backgroundColor: "transparent",
        borderRadius: 100,
    },
    floatButton: {
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        height: 60,
        backgroundColor: "transparent",
        borderRadius: 100,
    },
})