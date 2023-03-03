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
            <Image style={styles.logo} source={require("../assets/icon-red.png")}/>

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
                        

                        <AppButton title="Login" color='#bc1111' onPress={() => {login(email, password)}} />

                        
                    
                    

               

            </AppForm>


        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        padding:10,
        backgroundColor:'black'
    },

    title:{

        alignSelf:'center',
        marginTop:100,
        fontSize:35,
        fontWeight:'550',
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