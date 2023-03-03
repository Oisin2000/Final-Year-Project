import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight, Text, SafeAreaView } from 'react-native';
import  Swipeable  from 'react-native-gesture-handler/Swipeable';

function ListItem({title, subtitle, image, ImageComponent, onPress, renderRightActions}) {


    return (

        <Swipeable renderRightActions={renderRightActions}>
        
        <TouchableHighlight underlayColor={'#6e6969'} onPress={onPress}>

        <SafeAreaView style={styles.container}>
            {ImageComponent}
            {image && <Image style={styles.image} source={image}/>}
            <SafeAreaView style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text>{subtitle}</Text>
            </SafeAreaView>

        </SafeAreaView>
        </TouchableHighlight>
        </Swipeable>

    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection:'row',
        
    },
    image: {

        width:70,
        height:70,
        borderRadius:35,
        marginRight: 10,
        marginLeft:10,
        marginTop:20

    },

    title:{
        fontWeight:'500',
        marginTop:25
    },

    subTitle:{
        color:'#6e6969',
    },

    details: {
        marginLeft:10,
        justifyContent:'center'
    }
    
})

export default ListItem;