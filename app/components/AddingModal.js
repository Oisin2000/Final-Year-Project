import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import AddingScreen from '../screens/AddingScreen';

function AddingModal({visible}) {
    return (

        <Modal visible={visible} transparent>
        <View style={styles.modalContainer}>
          <AddingScreen setIsAdding={() => {}} />
        </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
    
button: {

    backgroundColor:"white",
    borderRadius:25,
    justifyContent: "center",
    alignItems:"center",
    padding:15,
    width:"100%",
    marginVertical:10,
    
},
text: {

    color:"black",
    fontSize:18,
    textTransform:"uppercase",
    fontWeight:"bold",
}

})

export default AddingModal;