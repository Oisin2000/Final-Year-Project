import React, {useContext, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, Image, Modal, View, Button } from 'react-native';
import * as Yup from 'yup';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';
import AppForm from '../components/AppForm';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AppModal from '../components/AppModal';

const validationSchema = Yup.object().shape({

    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")

})

function RegisterScreen(props) {

const [email, setEmail] = useState(null);
const [password, setPassword] = useState(null);

const {register} = useContext(AuthContext);
const [showModal, setShowModal] = useState(false);

const navigation = useNavigation(); // Get navigation object

  const handleRegister = async () => {
    try {
      await register(email, password);
      setShowModal(true);
    } catch (error) {
      console.log('Registration error', error);
    }
  }

  const handleOkPress = () => {
    setShowModal(false);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>The Film Club</Text>
      <Image style={styles.logo} source={require("../assets/icon-red.png")} />

      <AppForm
        initialValues={{ name: '', email: '', password: '' }}
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
        <AppButton style={styles.button} title="Register" color='#bc1111' onPress= {handleRegister}/>
      </AppForm>

      {showModal && <AppModal visible={showModal} animationType="slide" transparent={true} onPress={handleOkPress} title='Thank You for Registering' />}

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

    },

    modalstyle: {
        justifyContent:'center',
        alignItems:'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 300,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        
    }
});

export default RegisterScreen;