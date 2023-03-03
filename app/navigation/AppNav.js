import {View, Text, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import AppNavigator from './AppNavigator';
import OfflineNotice from '../components/OfflineNotice';
import AuthNavigator from './AuthNavigator';
import { NavigationContainer } from '@react-navigation/native'
import navigationTheme from './navigationTheme';
import { AuthContext } from '../../context/AuthContext';



 const AppNav = () => {

    const {isLoading, userToken} = useContext(AuthContext);

    if( isLoading ) {
        return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={'large'}/>
        </View>
        );
    }


    return (
        <>
        <OfflineNotice/>
    <NavigationContainer theme={navigationTheme}>
        {userToken !== null ? <AppNavigator/> : <AuthNavigator/> }
    </NavigationContainer>
    </>
    )
}

export default AppNav;