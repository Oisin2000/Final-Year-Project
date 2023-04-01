import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image } from 'react-native';

import AppButton from '../components/AppButton';
import colours from '../config/colours';


function WelcomeScreen({navigation}) {
    return (

        <View style={styles.container}>

        <View style={styles.logoContainer}>
        
        <Text style={styles.title}>The Film Club</Text>
        <Text style={styles.text}>The Home of Film</Text>
        </View>

        <View style = {styles.buttonContainer}>

            <AppButton title="Login" onPress={() => navigation.navigate("Login")}/>
            <AppButton title="Register" color={colours.secondary} onPress={() => navigation.navigate("Register")}/>

        </View>

        

        </View>


        
    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor:colours.primary

    },

    background: {

        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',

    },
    logo: {
        width: 150,
        height: 150,
        
        
    },
    buttonContainer:{
        padding:20,
        width:"100%",
        marginBottom:50
    },
   
    logoContainer:{
        position: 'absolute',
        top: 250,
        alignItems: "center"
        
    },
    title:{
      fontSize:55,
      color:colours.third,        
      fontWeight:"600",
      
      fontStyle:'italic',
      
    },

    text:{
        fontSize:35,
        color:colours.third,        
        fontWeight:"300",
        
        
        
      },

    
})

export default WelcomeScreen;