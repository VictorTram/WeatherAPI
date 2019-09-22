import React from 'react';
import { StyleSheet, Text, View, Input} from 'react-native';
import { Card, CardItem} from 'native-base'; 

export default class InputScreen extends React.Component{

    state = {
        data: []
    }
    
    static navigationOptions = {
        title: "Add City"
    }

    

    render(){
        return (
            <View style={styles.container}>
              <Text>Input Screen</Text>
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
});
