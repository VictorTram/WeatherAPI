import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import { Entypo } from '@expo/vector-icons';

export default class HomeScreen extends React.Component{

    state = {
        data: []
    }
    
    static navigationOptions ={
        title: "Weather API"
    }

    componentDidMount(){
        const {navigation} = this.props;
        navigation.addListener("willFocus", () => {
            this.getAllCities();
        })
    }

    getAllCities = async() => {
        await AsyncStorage.getAllKeys()
        .then( (keys) =>{
            return AsyncStorage.multiGet(keys)
            .then((result)=> {
                this.setState({
                    data: result
                })
            })
            .catch( error => console.log(error))
        })
        .catch( error => console.log(error))
        console.log(this.state.data);
    }


    render(){
        return (
            <View style={styles.container}>

                <TouchableOpacity
                style = {styles.floatButton}
                onPress = { () => {
                    this.props.navigation.navigate("Add")
                }}
                >
                    <Entypo
                    name="plus"
                    size = {30}
                    color="#FFF"
                    />
                </TouchableOpacity>
            </View>
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
  floatButton: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      position: "absolute",
      bottom: 10,
      right: 10,
      height:60,
      backgroundColor: "#B83227",
      borderRadius: 100,
  }
});
