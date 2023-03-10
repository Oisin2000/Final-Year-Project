import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../components/AppButton';


function WelcomeScreen({navigation}) {
    return (

        <ImageBackground 
       // blurRadius={10}
        style={styles.background}
        source={require('../assets/rows-red-seats-theater.jpg')}
        >

        <View style={styles.logoContainer}>
        <Image style = {styles.logo} source={require('../assets/icon-white.png')}/>
        <Text style={styles.title}>The Film Club</Text>
        </View>

        <View style = {styles.buttonContainer}>

            <AppButton title="Login" onPress={() => navigation.navigate("Login")}/>
            <AppButton title="Register" color="#d62230" onPress={() => navigation.navigate("Register")}/>

        </View>

        

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
        
        
    },
    buttonContainer:{
        padding:20,
        width:"100%",
        marginBottom:30
    },
   
    logoContainer:{
        position: 'absolute',
        top: 200,
        alignItems: "center"
        
    },
    title:{
      fontSize:30,
      color:"white",        
      fontWeight:"600",
      paddingVertical:15
    },

    
})

export default WelcomeScreen;