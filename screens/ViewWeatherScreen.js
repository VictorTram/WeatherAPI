import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Linking, Platform, Alert, AsyncStorage } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import { Entypo } from '@expo/vector-icons';

export default class ViewWeatherScreen extends React.Component{

    state = {
        key: "",
        cityName: "DummyText",
        apiResponse: [],
        
        
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
                    <Text style={styles.infoText}>Weather : {JSON.stringify(this.state.apiResponse.name)}</Text>
                    <Text style={styles.infoText}>Temp : {}</Text>
                    <Text style={styles.infoText}>Type : {}</Text>
                    <Text style={styles.infoText}>City : {}</Text>
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
