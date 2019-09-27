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
      apiResponse: [],
    }
    
    static navigationOptions = {
        title: "Add City"
    }

    saveCityData = async() => {
      if( this.state.cityName !== ""){
        await this.getWeatherData();
      }else{
        Alert.alert("Please enter in a city name.");
      }
      console.log("API ResponseOut " + this.state.apiResponse.cod)
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
        }
        await AsyncStorage.setItem( Date.now().toString(),JSON.stringify(cityData))
        .then (()=> {
          this.props.navigation.goBack()
        })
        .catch( (error) => console.log(error))
      }
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
