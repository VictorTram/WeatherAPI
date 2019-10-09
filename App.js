import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, CardItem} from 'native-base'; 
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainHome from './screens/MainHome';
import Minimal from './screens/Minimal';
import HomeScreen from './screens/HomeScreen';
import ViewWeatherScreen from './screens/ViewWeatherScreen';
import SearchCityScreen from './screens/SearchCityScreen';


const MainNavigator = createStackNavigator(
  {
    Home: {screen: MainHome},
    AltHome: {screen: HomeScreen},
    Minimal: {screen: Minimal},
    View: {screen: ViewWeatherScreen},
    Search: {screen: SearchCityScreen},
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#74B9FF",
      },
      headerTitleStyle: {
        color: "#fff",
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;