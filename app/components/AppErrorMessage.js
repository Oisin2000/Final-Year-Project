import React from 'react';
import { StyleSheet , Text} from 'react-native';
import AppText from './AppText';

function AppErrorMessage({error, visible}) {

    if (!visible || !error) return null;


    return (

        <Text style={styles.error}>{error}</Text>

    );
}

const styles = StyleSheet.create({

error: {
    color:'red',
    padding:5
    
}

    
})

export default AppErrorMessage;