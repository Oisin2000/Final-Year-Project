import React, {useContext, useState} from 'react';
import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppText from '../components/AppText';
import AppErrorMessage from '../components/AppErrorMessage';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';
import AppForm from '../components/AppForm';
import authApi from '../api/auth'
import { AuthContext } from '../../context/AuthContext';
import colours from '../config/colours';



const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")

})


function LoginScreen(props) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const {login} = useContext(AuthContext);




    return (

        <SafeAreaView style={styles.container}>
            
            <Text style={styles.title}>The Film Club</Text>
            <Text style={styles.subtitle}>Please enter your details to login !</Text>
            

            <AppForm
                initialValues={{email: '', password: '' }}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >

                

                        <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAdress"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        />

                        <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        secureTextEntry
                        placeholder="Password"
                        textContentType="password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        />
                        

                        <AppButton title="Login" color={colours.third} onPress={() => {login(email, password)}} />

                        
                    
                    

               

            </AppForm>


        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        padding:10,
        backgroundColor:colours.primary
    },

    title:{

        alignSelf:'center',
        marginTop:100,
        marginBottom:10,
        fontSize:45,
        fontWeight:'550',
        fontStyle:'italic',
        color:colours.secondary,
        
  
    },
  
    subtitle:{
  
        alignSelf:'center',
        
        fontSize:25,
        fontWeight:'550',
        marginBottom:100,
        color:"white",
        
  
    },

    logo: {
        width:110,
        height:110,
        alignSelf:'center',
        marginTop: 20,
        marginBottom:40
    }
    
})

export default LoginScreen;