import React from 'react';
import { Text , StyleSheet, Platform} from 'react-native';

function AppText({children}) {
    return (

        <Text style={styles.mytext}>{children}</Text>
        

    );
}

const styles = StyleSheet.create({
    mytext:{
        fontSize:18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        

    }
});

export default AppText;