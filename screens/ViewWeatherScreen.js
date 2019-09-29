import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Linking, Platform, Alert, FlatList, AsyncStorage } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import { Entypo } from '@expo/vector-icons';

export default class ViewWeatherScreen extends React.Component{

    state = {
        key: "",
        cityName: "DummyText",
        apiResponse: [],

        coord: [],
        weather: [],
        base: "",
        main: [],
        visibility: "",
        wind: [],
        clouds: [],
        dt: "",
        sys: [],
        timezone: "",
        id: "",
        name: "",
        cod: "",
    }

    static navigationOptions = {
        title: "View Page"
    }

    componentDidMount(){
        const { navigation } = this.props;
        navigation.addListener("willFocus", () => {
            var key=this.props.navigation.getParam("key","");
            this.getCityData(key);
            this.props.navigation.setParams({ title: this.state.cityName})
        })

    }


    getCityData = async (key) => {
        await AsyncStorage.getItem(key)
        .then( contactJsonString => {
            var data = JSON.parse(contactJsonString)
            data["key"] = key;
            this.setState({
                cityName: data.cityName,
                apiResponse: data.apiResponse,
                coord: data.coord,
                weather: data.weather,
                base: data.base,
                main: data.main,
                visibility: data.visibility,
                wind: data.wind,
                clouds: data.clouds,
                dt: data.dt,
                sys: data.sys,
                timezone: data.timezone,
                id: data.id,
                name: data.name,
                cod: data.cod,
            });
            console.log("ViewWeatherScreen: After update " + this.state.weather[0].main);

        })
        .catch( (error) => console.log(error))
    }
    

    render(){
        return (
            <ScrollView style={styles.infoContainer}>
                <Text style={styles.cityName}>
                   {this.state.cityName}
               </Text>
               <FlatList
                data = {this.state.weather}
                renderItem = { ({item}) => {
                    console.log(item);
                    data = item;
                    iconurl = "http://openweathermap.org/img/w/" + data.icon + ".png";
                    return (
                        <View style={styles.container}>
                            <Text style={styles.infoText}>Weather : {data.main}</Text>
                            <Text style={styles.infoText}>Type : {data.description}</Text>
                            <Image source = {{uri: iconurl}} style={{width: 40, height: 40}} />
                        </View>
                    )
                }}
                keyExtractor = { (item, index) => item.id.toString()}
                />
                <Text style={styles.infoText}>
                    Temp : {this.state.main.temp}
                </Text>
                <Text style={styles.infoText}>
                    City : {this.state.name}, {this.state.sys.country}
                </Text>
            </ScrollView>
          );
    }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
