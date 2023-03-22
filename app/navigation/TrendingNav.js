import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrendingMoviesScreen from '../screens/TrendingMoviesScreen';

const TrendingNav = createStackNavigator();

const TrendingNavigator = () => (
  <TrendingNav.Navigator>
    <TrendingNav.Screen
      name="TrendingMovies"
      component={TrendingMoviesScreen}
      options={{ headerShown: false }}
    />
  </TrendingNav.Navigator>
);

export default TrendingNavigator;