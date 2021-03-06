import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {weatherConditions } from '../utils/WeatherConditions';

convertToFahrenheit =(Kelvin)=>{
    return Math.round((Kelvin - 273.15) * 9/5 + 32);
}

const Weather = ({city, weather, temperature}) => {

    return (
        <View style= {[
            styles.weatherContainer,
            { backgroundColor: weatherConditions[weather].color },
        ]}>
            <Text style={styles.title}>{city}</Text>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons 
                size={48}
                name= {weatherConditions[weather].icon}
                color = "#fff"
                />
                <Text style={styles.tempText}> {convertToFahrenheit(temperature)} °F</Text>
            </View>
            <View style={styles.bodyContainer}> 
                <Text style={styles.title}> {weatherConditions[weather].title} </Text>
                <Text style={styles.subtitle}> {weatherConditions[weather].subtitle} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
    },
    headerContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tempText: {
        fontSize: 48,
        color: '#fff',
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40,
    },
    title: {
        fontSize: 48,
        color: '#fff',
    },
    subtitle:{
        fontSize: 24,
        color: '#fff',
    }
});

export default Weather;
