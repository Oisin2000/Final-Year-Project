import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../components/AppButton';


function WelcomeScreen({navigation}) {
    return (

        <View style={styles.container}>

        <View style={styles.logoContainer}>
        <Image style = {styles.logo} source={require('../assets/gold-icon.png')}/>
        <Text style={styles.title}>The Film Club</Text>
        <Text style={styles.text}>The Home of Film</Text>
        </View>

        <View style = {styles.buttonContainer}>

            <AppButton title="Login" onPress={() => navigation.navigate("Login")}/>
            <AppButton title="Register" color="#E6AF2E" onPress={() => navigation.navigate("Register")}/>

        </View>

        

        </View>


        
    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor:'#3F0D12'

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
        marginBottom:30
    },
   
    logoContainer:{
        position: 'absolute',
        top: 200,
        alignItems: "center"
        
    },
    title:{
      fontSize:45,
      color:"white",        
      fontWeight:"600",
      paddingVertical:15,
      
    },

    text:{
        fontSize:35,
        color:"white",        
        fontWeight:"500",
        padding:10,
        fontStyle:'italic',
      },

    
})

export default WelcomeScreen;