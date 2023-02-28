import React, {FunctionComponent, useEffect} from 'react';
import {  StyleSheet, View, Image, Text, Modal, Dimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

function AddingScreen() {



    return (

       

        <View style={styles.container}>
            
            
            <LottieView 
            
            style={styles.animation}
            autoPlay
            loop={false}
            source ={require('../assets/done.json')}
            text = "Adding Movie ...."
            />
            
            
         </View>

        

        
    );
}

const styles = StyleSheet.create({
    

    container: {

        alignItems:'center',
        justifyContent:'center',
        flex:1,
        paddingHorizontal: 30,

    },

    animation: {

        
        width: 150
        

    }






});

export default AddingScreen;