import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';

function HomeScreenTile({title, color, onPress, icon}) {
    return (

        <TouchableOpacity style={styles.smallcontainer} onPress={onPress}>

            
            <FontAwesome5 name={icon} color={'#FFF'} size={20} style={styles.icon}/> 
            <Text style={styles.text}>{title}</Text>
            
        
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
smallcontainer: {
    backgroundColor: '#A71D31',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection:'row',
    height: 70,
    width: 170,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
   borderColor:'#FFF',
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

export default HomeScreenTile;