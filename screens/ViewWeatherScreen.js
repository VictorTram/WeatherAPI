import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Linking, Platform, Alert, AsyncStorage } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import { Entypo } from '@expo/vector-icons';

export default class ViewWeatherScreen extends React.Component{

    state = {
        cityName: "DummyText",
        weather: {},
        main: {},
        sys: {},
        city: "",
        key: "",
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
                weather: data.weather[0],
                main: data.main,
                sys: data.sys,
                city: data.city,
            });
            console.log("ViewWeatherScreen: After update " + contactJsonString);
        })
        .catch( (error) => console.log(error))
    }

    

    render(){
        return (
            <ScrollView style={styles.container}>
               <View style={styles.infoContainer}>
                   <Text style={styles.cityName}>
                       {this.state.cityName}
                   </Text>
                    <Text style={styles.infoText}>Weather : {JSON.stringify(this.state.weather)}</Text>
                    <Text style={styles.infoText}>Temp : {this.state.main.temp}</Text>
                    <Text style={styles.infoText}>Type : {this.state.sys.type}</Text>
                    <Text style={styles.infoText}>City : {this.state.city}</Text>
               </View>
               
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
