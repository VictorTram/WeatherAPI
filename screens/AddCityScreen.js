import React from 'react';
import { StyleSheet, Text, Keyboard, ScrollView, Alert, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import { Form, Item, Input, Label, Button, Card, CardItem} from 'native-base'; 

export default class AddCityScreen extends React.Component{

    state = {
      isLoading: true,
      apiKey: '',  
      cityName: "",
      weather: [],
      sys: [],
      name: "",
    }
    
    static navigationOptions = {
        title: "Add City"
    }

    saveCityData = async() => {
      if(
        this.state.city !== ""
      ){
        var cityData = {
          cityName: this.state.cityName,
        }
      }else{
        Alert.alert("Please enter in a city name.");
      }
      //await AsyncStorage.setItem( Date.now().toString(),JSON.stringify(cityData))
      this.getWeatherData();
      
    }

    componentDidMount(){
      this.getWeatherData();
    }

    getWeatherData = () => {
      return (
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}${this.state.apiKey}`)
        .then( response => response.json())
        .then( responseJson => {
          // this.setState({
          //   isLoading: false,
          //   dataSource: this.state.dataSource.concat(responseJson.results)
          // })
          console.log(responseJson)
        })
        .catch(error => console.log(error))
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
