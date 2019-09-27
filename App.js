import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import ViewWeatherScreen from './screens/ViewWeatherScreen';
import AddCityScreen from './screens/AddCityScreen';


const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    View: {screen: ViewWeatherScreen},
    Add: {screen: AddCityScreen},
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#b83227",
      },
      headerTitleStyle: {
        color: "#fff",
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;