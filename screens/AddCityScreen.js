import React from 'react';
import { StyleSheet, Text, Keyboard, ScrollView, Alert, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import { Form, Item, Input, Label, Button, Card, CardItem} from 'native-base'; 
import {secretApiKey} from '../config';

const apiKey = secretApiKey;
console.log("test " + JSON.stringify(secretApiKey));

const requestThing =  
{ 
  "coord":{ 
     "lon":139.76,
     "lat":35.68
  },
  "weather":[ 
     { 
        "id":802,
        "main":"Clouds",
        "description":"scattered clouds",
        "icon":"03n"
     }
  ],
  "base":"stations",
  "main":{ 
     "temp":293.79,
     "pressure":1024,
     "humidity":83,
     "temp_min":290.15,
     "temp_max":297.04
  },
  "visibility":10000,
  "wind":{ 
     "speed":1.5,
     "deg":150
  },
  "clouds":{ 
     "all":40
  },
  "dt":1569608274,
  "sys":{ 
     "type":1,
     "id":8074,
     "message":0.0075,
     "country":"JP",
     "sunrise":1569616368,
     "sunset":1569659453
  },
  "timezone":32400,
  "id":1850147,
  "name":"Tokyo",
  "cod":200
};

export default class AddCityScreen extends React.Component{

    state = {
      isLoading: true, 
      cityName: "",
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
        title: "Add City"
    }

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

    storeData = async(cityData) => {
      await AsyncStorage.setItem( Date.now().toString(),JSON.stringify(cityData))
        .then (()=> {
          this.props.navigation.goBack()
        })
        .catch( (error) => console.log(error))
    }

    getDummyData = async() => {
      await this.setStateAsync(
        {
          apiResponse: requestThing,
          cityName: requestThing.name,
          coord: requestThing.coord,
          weather: requestThing.weather,
          base: requestThing.base,
          main: requestThing.main,
          visibility: requestThing.visibility,
          wind: requestThing.wind,
          clouds: requestThing.clouds,
          dt: requestThing.dt,
          sys: requestThing.sys,
          timezone: requestThing.timezone,
          id: requestThing.id,
          name: requestThing.name,
          cod: requestThing.cod,
        }
      );
    }

    setStateAsync(state) {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
  }

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
    

    render(){
        return (
            <TouchableWithoutFeedback
            onPress={ () => {
              Keyboard.dismiss
            }}
            >
              <ScrollView>
              <Form>
                <Item>
                  <Label>
                    City Name
                  </Label>
                  <Input
                  autocorrect= {false}
                  autoCapitalize= 'none'
                  keyboardType="default"
                  onChangeText={ (cityName) =>{
                    this.setState({cityName})
                  }}
                  />
                </Item>
              </Form>
              <Button
              full
              style={styles.button}
              onPress = { () => {
                this.saveCityData();
              }}
              >
                <Text style={styles.buttonText}> Save</Text>
              </Button>
              </ScrollView>
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
  button:{

  },
  buttonText:{

  },
});
