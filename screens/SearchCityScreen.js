import React from 'react';
import { StyleSheet, Text, Keyboard, ScrollView, Alert, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, FlatList,View} from 'react-native';
import { Form, Item, Input, Label, Button, Card, CardItem} from 'native-base'; 

import {secretApiKey} from '../config';

import {dummyData} from '../utils/dummyWeatherData';
import {dummyCity} from '../utils/dummyCity';


import {SearchBar} from 'react-native-elements';

// const apiKey = secretApiKey;
const apiKey = "";

export default class SearchCityScreen extends React.Component{

    state = {
      isLoading: true, 
      cityName: "",
      search: "",
      searchList: [],
      
    }
    arrayholder= [];
    
    
    static navigationOptions = {
        title: "Add City"
    }

  // Deprecate. Not needed because we will be "favoriting" on-call
    saveCityData = async() => {
      if( this.state.cityName !== ""){
        //await this.getWeatherData();
        await this.getDummyData();
        
      }else{
        Alert.alert("Please enter in a city name.");
      }
      console.log("API ResponseOut " + this.state.cityName)
      // Check if API Response; city not found
      if(this.state.apiResponse.cod == "404" || this.state.apiResponse.message == "city not found"){
        Alert.alert("City not found. Please try again.");
      } else if( this.state.apiResponse.cod == "429"){
        Alert.alert("Account is blocked");
      } 
      else {
        var cityData = {
          cityName: this.state.cityName,
          apiResponse: this.state.apiResponse,
          coord: this.state.coord,
          weather: this.state.weather,
          base: this.state.base,
          main: this.state.main,
          visibility: this.state.visibility,
          wind: this.state.wind,
          clouds: this.state.clouds,
          dt: this.state.dt,
          sys: this.state.sys,
          timezone: this.state.timezone,
          id: this.state.id,
          name: this.state.name,
          cod: this.state.cod,
        }
        await this.storeData(cityData);    
      }
    }

    // Save data... Maybe have this on homepage?
    storeData = async(cityData) => {
      await AsyncStorage.setItem( Date.now().toString(),JSON.stringify(cityData))
        .then (()=> {
          this.props.navigation.goBack()
        })
        .catch( (error) => console.log(error))
    }

    // Disable/Deprecate?
    getWeatherData = () => {
      return (
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${secretApiKey}`)
        .then( response => response.json())
        .then( responseJson => {
          this.setState({
            isLoading: false,
            apiResponse: responseJson,
          });
          console.log("API Response " + this.state.apiResponse);
          console.log("responseJson " + JSON.stringify(responseJson));     
        })
        .catch(error => {
          console.log(error)
        })
      )
    }
    
    updateSearch = async(search) => {
      // this.setState({
      //   search: search
      // }); 
      this.setState({search});
      // console.log(dummyCity);
      // for( var city of dummyCity){
      //   if(search == city){
      //     console.log("Found " + city );
      //     await this.setState(prevState => ({
      //       searchList: [city, ...prevState.searchList, ]
      //     }))
      //   }
      // }

      const newData = dummyCity.filter( city => {      
        if(city.includes(search)){
          console.log("Found " + city );
          return city;
        }   
      });
      this.setState({ searchList: newData }); 
    }

    render(){

      const { search } = this.state;

        return (
            <TouchableWithoutFeedback
            onPress={ () => {
              Keyboard.dismiss
            }}
            >
              <View>
                <SearchBar
                lightTheme
                placeholder= "Type City Name here..."
                onChangeText = {this.updateSearch}
                value ={search}
                />
                <FlatList
                data={this.state.searchList}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                    onPress = {() => {
                        // This sends the key over as a parameter for View
                        console.log("Pressed " + item);
                        
                        // this.props.navigation.goBack();
                        this.props.navigation.navigate("View",{
                          city: item,
                          isLoading: false,
                        })    
                    }}
                    >
                        <Card style={styles.listItem}>
                          <View>
                              <Text>{item}</Text>
                          </View>
                        </Card>
                    </TouchableOpacity>
                    );
                  }}
                  keyExtractor = { (item, index) => item.toString()}
                  >
                  </FlatList>
              </View>
            </TouchableWithoutFeedback>
          );
    }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flex: 1,
    flexDirection: 'row',
  },  
  button:{

  },
  buttonText:{

  },
});
