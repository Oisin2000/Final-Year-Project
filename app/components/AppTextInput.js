import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

function AppTextInput({icon, ...otherProps}) {
    return (
        <View style={styles.container}>
            
            { icon && <MaterialCommunityIcons name={icon} size={20} color="#black" style={styles.icon}/>}
            <TextInput style={styles.textInput} {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        backgroundColor:'white',
        borderRadius:25,
        flexDirection:"row",
        width:'100%',
        padding:15,
        marginVertical:10

    },

    textInput:{

        fontSize:18,
        fontFamily: Platform.OS === "android" ? "Roboto":"Avenir",
        color:"#0c0c0c"

    },

    icon:{

        marginTop:2,
        marginRight:10,

    }
    
})

export default AppTextInput;