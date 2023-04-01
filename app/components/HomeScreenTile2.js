import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Feather, FontAwesome5} from '@expo/vector-icons';
import colours from '../config/colours';

function HomeScreenTile2({title, color, onPress, icon}) {
    return (

        <TouchableOpacity style={styles.smallcontainer} onPress={onPress}>

            
            <Feather name={icon} color={'#FFF'} size={25} style={styles.icon}/> 
            <Text style={styles.text}>{title}</Text>
            
        
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
smallcontainer: {
    backgroundColor: colours.third,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection:'row',
    height: 70,
    width: 170,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
   borderColor:colours.secondary,
   borderWidth:2
    
    },

    icon:{

        padding:15,
        flexDirection:'row',
        
        

    },

text: {

    color:"#FFF",
    fontSize:14,
    fontWeight:"bold",
}

})

export default HomeScreenTile2;