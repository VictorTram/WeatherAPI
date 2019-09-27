import React from 'react';
import { StyleSheet, Text, Keyboard, ScrollView, Alert, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import { Form, Item, Input, Label, Button, Card, CardItem} from 'native-base'; 
import {secretApiKey} from '../config';

const apiKey = secretApiKey;
console.log("test " + JSON.stringify(secretApiKey));

export default class AddCityScreen extends React.Component{

    state = {
      isLoading: true, 
      cityName: "",
      //apiKey: "",
      weather: [],
      main: [],
      sys: [],
      city: "",
    }
    
    static navigationOptions = {
        title: "Add City"
    }

    saveCityData = async() => {
      if(
        this.state.cityName !== ""
      ){
        this.getWeatherData();
        var cityData = {
          cityName: this.state.cityName,
          weather: this.state.weather,
          main: this.state.main,
          sys: this.state.sys,
          city: this.state.city,
        }
        
        console.log("set data1 " + this.state.weather.description);
        console.log("set data2 " + this.state.sys.type);
      }else{
        Alert.alert("Please enter in a city name.");
      }
      console.log("Got City Data");
      await AsyncStorage.setItem( Date.now().toString(),JSON.stringify(cityData))
      .then (()=> {
        this.props.navigation.goBack()
      })
      .catch( (error) => console.log(error))
    }


    getWeatherData = () => {
      return (
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}${secretApiKey}`)
        .then( response => response.json())
        .then( responseJson => {
          this.setState({
            isLoading: false,
            weather: responseJson.weather,
            main: responseJson.main,
            //apiKey: secretApiKey,
            sys: responseJson.sys,
            city: responseJson.name,
          });
          console.log("The response: "+ JSON.stringify(responseJson));
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
