import React, {FunctionComponent, useState, useEffect} from 'react';
import {  StyleSheet, View, Image, Text, Modal, Dimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import colours from '../config/colours';


function AddingScreen({ setIsAdding }) {
    console.log("AddingScreen rendered");
    const [isDone, setIsDone] = useState(false);
  
    const handleAnimationFinish = () => {
      setIsDone(true);
      setTimeout(() => setIsAdding(false), 3000); // hide the AddingScreen component after 500ms
    };
  
    return (
        <View style={styles.container}>
      <LottieView
        style={styles.animation}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        source={require('../assets/done.json')}
        text="Adding Movie ...."
      />
    </View>
    );
  }

const styles = StyleSheet.create({
    

    container: {

        alignItems:'center',
        justifyContent:'center',
        ...StyleSheet.absoluteFillObject,
        flex:1,
        paddingHorizontal: 30,
        backgroundColor:colours.primary,
        zIndex:9999,

    },

    animation: {

        color:colours.secondary,
        width: 150,
        
        

    },

    text: {

        color:colours.white,
        fontSize: 20
        

    }






});

export default AddingScreen;