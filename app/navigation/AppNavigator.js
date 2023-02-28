import React from 'react';
import { createBottomTabNavigator } from 'react-navigation/bottom-tabs'

import MyMoviesScreen from '../screens/MyMoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (

    <Tab.Navigator>
        <Tab.Screen name="Search Screen" component={SearchScreen}/>
        <Tab.Screen name="My Movies" component={MyMoviesScreen}/>
        <Tab.Screen name="My WatchList" component={WatchListScreen}/>
    </Tab.Navigator>





)

export default AppNavigator;