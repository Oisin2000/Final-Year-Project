import React, { useState } from 'react';
import { Button, Text, View, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import AppButton from './AppButton';

const GenreModal = ({visible, animationType, transparent, title, onPress}) => {
    if(!visible) {
      return null;
    }

    const [genre, setGenre] = useState('Action');

    const handleSelection = () => {
        setGenre(title);
      };

      
  
    return (
      <Modal visible={visible} animationType={animationType} transparent={transparent}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <AppButton onPress={handleSelection} title="Action"/>
            <AppButton onPress={handleSelection} title="Thriller"/>
            <AppButton onPress={handleSelection} title="Comedy"/>
            <AppButton onPress={handleSelection} title="Horror"/>
            <AppButton onPress={handleSelection}title="Romance"/>
            <Button onPress={onPress} title="Close"></Button>
            
            
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999, // add zIndex to make the modal displayed in front of everything else
    },
    modalView: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      fontSize:25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight:'600',
      fontStyle:'italic',
      textAlign: 'center',
    },
  })

  export default GenreModal;