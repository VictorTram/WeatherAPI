import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

import {secretApiKey} from '../config';

import Weather from '../components/Weather';
import {dummyData} from '../utils/dummyWeatherData';


export default class App extends React.Component{
    state = {
        isLoading: true,
        temperature: 0,
        weatherCondition: null,
        error: null,
    }

    static navigationOptions = {
        title: "Minimal"
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            position => {
                //this.getWeatherData(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({
                    error: "Error Getting the Weather Conditions",
                });
            }
        );
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
        const { isLoading, weatherCondition, temperature } = this.state;
        const {navigation} = this.props;
        console.log(navigation.getParam('city'));
        if( !isLoading ){
            return (
                <View>
                    <Text> Fetching the Weather</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Weather weather={dummyData[navigation.getParam('city')].weather[0].main} temperature={dummyData[navigation.getParam('city')].main.temp} />
                {/* <Weather weather={weatherCondition} temperature={temperature}/> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})