import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../components/AppButton';

function WelcomeScreen(props) {
    return (

        <ImageBackground 
        style={styles.background}
        source={require('../assets/rows-red-seats-theater.jpg')}
        >

        <View style={styles.logoContainer}>
        <Image style = {styles.logo} source={require('../assets/logo.png')}/>
        <Text style={styles.title}>The Film Club</Text>
        </View>

        <View>

            <AppButton title="Login" onPress={() => console.log("Tapped")}/>
            
        </View>

        <View style={styles.registerButton}></View>

        </ImageBackground>


        
    );
}

const styles = StyleSheet.create({

    background: {

        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',

    },
    logo: {
        width: 100,
        height: 100,
        backgroundColor: "#d62230"
    },
    loginButton:{
        width: '100%',
        height: 70,
        backgroundColor: '#130002'
    },
    registerButton:{
        width: '100%',
        height: 70,
        backgroundColor: '#d62230'
    },
    logoContainer:{
        position: 'absolute',
        top: 200,
        alignItems: "center"
        
    },
    title:{
      fontSize:25,
      color:"white",        
    },

    
})

export default WelcomeScreen;