import React from 'react';

import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import { apisAreAvailable } from 'expo';

export default class App extends React.Component{

    static navigationOptions ={
        title: "Weather API",
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>
                    New Home Page
                </Text>
                <View style={styles.actionButtons}>          
                        <Button
                            title="Minimal"
                            style={styles.button}
                            onPress = { () => {
                                this.props.navigation.navigate("Minimal")
                            }}
                            /> 
                        <Button
                            title="Alt Home (Deprecate)"
                            style={styles.button}
                            onPress = { () => {
                                this.props.navigation.navigate("AltHome")
                            }}
                            />                    
                </View>

            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button:{
        padding: 20,
    }
});
  