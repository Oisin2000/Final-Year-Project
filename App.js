import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity , Button  ,Image, SafeAreaView, Alert} from 'react-native';
import AppButton from './app/components/AppButton';
import WelcomeScreen from './app/screens/WelcomeScreen';
import SearchScreen from './app/screens/SearchScreen';
import MyMoviesScreen from './app/screens/MyMoviesScreen';
import WatchListScreen from './app/screens/WatchListScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {

 

  return (
  
  <NavigationContainer theme={navigationTheme}>
    <AppNavigator/>
  </NavigationContainer>
  

  )
}


