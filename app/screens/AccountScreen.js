import React, { useState } from 'react';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import GenreModal from '../components/GenreModal'

function AccountScreen(props) {

    const {logout} = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const handleGenre = () => {
        setShowModal(true);
      };

      const handleClose = () => {
        setShowModal(false);
      };
    


    return (
        <SafeAreaView>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>The Film Club</Text>
            <Text style={styles.subtitle}>Your Home for all things Film</Text>
        </SafeAreaView>
        <SafeAreaView>

        
        <ListItem
        title="Oisin O'Donnell"
        subtitle="oisinodonnell123@gmail.com"
        image={require('../assets/account.jpg')}

        />

        <ListItem
        title="My Genres"
        subtitle="Action , Thrillers"
        image={require('../assets/Genre.png')}
        onPress={handleGenre}
        

        />
        {showModal && <GenreModal visible={showModal} animationType="slide" transparent={true} onPress={handleClose} title = "Please Select your favourite Genre..."></GenreModal>}

        <ListItem
        title="My Theme"
        subtitle="Choose your favourite colour scheme"
        image={require('../assets/Theme.png')}

        />
        </SafeAreaView>
        <View style={styles.buttoncontainer}>
        <MaterialCommunityIcons name="logout" size={30}/>
        <Button style={styles.button} title='Sign Out' onPress={ () => {logout()}}/>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {

        justifyContent:'center',
        alignItems:'center',
        marginBottom:100,
        marginTop:40

    },
    
    title: {
        fontSize:35,
        fontWeight:'600'
    },

    subtitle: {
        fontSize:25,
        fontWeight:'400',
        fontStyle:'italic'
    },

    buton: {
        fontSize:25,
        fontWeight:'400',
        
    },

    buttoncontainer: {
        marginTop:80,
        justifyContent:'flex-start',
        alignItems:'center',
        
        
    }

})



export default AccountScreen;