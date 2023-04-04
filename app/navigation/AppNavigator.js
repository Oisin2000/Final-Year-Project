import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';

import MyMoviesScreen from '../screens/MyMoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';
import AccountScreen from '../screens/AccountScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeScreen2 from '../screens/HomeScreen2';
import { StackActions } from '@react-navigation/native';
import TrendingNavigator from './TrendingNav';
import AddingScreen from '../screens/AddingScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = ({refresh}) => (

    

    <Tab.Navigator>
        <Tab.Screen 
        name="Home" 
        component={HomeScreen2} 
        options={{

            tabBarIcon: ({color, size}) =>
            <MaterialCommunityIcons name="home" color={color} size={size}/>,

            headerShown: false
            }}
        />

    
        <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{

            tabBarIcon: ({color, size}) =>
            <MaterialCommunityIcons name="movie-search-outline" color={color} size={size}/>,

            headerShown: false
            }}
        />

        <Tab.Screen 
        name="My Movies" 
        component={MyMoviesScreen} 
        options={{

            tabBarIcon: ({color, size}) =>
            <Ionicons name="film-outline" color={color} size={size}/>,

            headerShown: false
            }}
        />

        <Tab.Screen 
        name="My WatchList" 
        component={WatchListScreen} 
        options={{

            tabBarIcon: ({color, size}) =>
            <FontAwesome5 name="glasses" color={color} size={size}/>,

            headerShown: false
            }}
        />

        <Tab.Screen
            name="My Account"
            options={{
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
                headerShown: false,
            }}
            >
      {(props) => <AccountScreen {...props} refresh={refresh} />}
    </Tab.Screen>

        <Tab.Screen 
            name="Adding Screen"
            component={AddingScreen}
            options={{ tabBarButton: () => null }}
        />

    </Tab.Navigator>

    




)

export default AppNavigator;