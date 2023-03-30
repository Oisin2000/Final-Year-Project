import React, { useState } from 'react';
import { Button, Text, View, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import AppButton from './AppButton';

const ThemeModal = ({visible, animationType, transparent, title, onPress}) => {
    if(!visible) {
      return null;
    }

    const [theme, setTheme] = useState('default');

    const handleSelection = (selectedTheme) => {
      setTheme(selectedTheme);
      if (onThemeSelected) {
        onThemeSelected(selectedTheme);
      }
    };
    

      
  
    return (
      <Modal visible={visible} animationType={animationType} transparent={transparent}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <AppButton onPress={() => handleSelection('Fiery Sunset')} title="Fiery Sunset" />
            <AppButton onPress={() => handleSelection('Ocean Breeze')} title="Ocean Breeze"/>
            <AppButton onPress={() => handleSelection('Enchanted Forest')} title="Enchanted Forest"/>
            <AppButton onPress={() => handleSelection('Golden Hour')} title="Golden Hour"/>
            <AppButton onPress={() => handleSelection('Midnight Magic')} title="Midnight Magic"/>
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

  export default ThemeModal;