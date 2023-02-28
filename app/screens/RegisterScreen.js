import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import * as Yup from 'yup';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';
import AppForm from '../components/AppForm';


const validationSchema = Yup.object().shape({

    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")

})


function RegisterScreen(props) {




    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>The Film Club</Text>
            <Image style={styles.logo} source={require("../assets/icon-red.png")}/>
            

            <AppForm
                initialValues={{name: '', email: '', password: '' }}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >

                
                        <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="account"
                        name="name"
                        placeholder="Name"
                        textContentType="name"
                        />
                        <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAdress"
                        />

                        <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        secureTextEntry
                        placeholder="Password"
                        textContentType="password"
                        />
                        

                        <SubmitButton style={styles.button} title="Register"  />
                    
                    

               

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
    },

    button: {

        paddingTop:40

    }
    
})

export default RegisterScreen;