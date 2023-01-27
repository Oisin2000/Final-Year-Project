import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function AppButton({title, onPress}) {
    return (

        <TouchableOpacity style={styles.button} onPress={onPress}>


        <Text style={styles.text}>{title}</Text>

        
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
button: {

    backgroundColor:"white",
    borderRadius:25,
    justifyContent: "center",
    alignItems:"center",
    padding:15,
    width:300,
},
text: {

    color:"black",
    fontSize:18,
    textTransform:"uppercase",
    fontWeight:"bold",
}

})

export default AppButton;