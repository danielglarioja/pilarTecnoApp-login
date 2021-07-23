import React, { useState } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('window');

const NewAccount = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    return (
        <SafeAreaView>
            <ImageBackground
                style={{
                    height,
                    paddingLeft: width / 6,
                    paddingRight: width / 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                source={require('../assets/images/Lamp.jpg')}
            >
                <TextInput
                    style={style.input}
                    value={email}
                    placeholder='Insert Email'
                    placeholderTextColor='rgba(255, 255, 255, .35)'
                    onChangeText={(e) => setEmail(e)}
                />
                <TextInput
                    style={style.input}
                    value={password}
                    placeholder='Password (min 6 characters)'
                    placeholderTextColor='rgba(255, 255, 255, .35)'
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword(e)}
                />
                <TextInput
                    style={style.input}
                    value={password2}
                    placeholder='Confirm Password'
                    placeholderTextColor='rgba(255, 255, 255, .35)'
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword2(e)}
                />
                <TouchableOpacity
                    style={style.button}
                    onPress={ () => {
                        password2 === password ?
                            auth()
                                .createUserWithEmailAndPassword(email, password)
                                .then(() => {
                                    console.log('User account created.');
                                    Alert.alert('User account created.');
                                    props.navigation.navigate('LogIn');
                                })
                                .catch(error => {
                                    if (error.code === 'auth/email-already-in-use') {
                                        Alert.alert('That email address is already in use!');
                                    }
                                    if (error.code === 'auth/invalid-email') {
                                        Alert.alert('That email address is invalid!');
                                    }
                                    console.error(error);
                                })
                        : Alert.alert('Passwords not coincide'); 
                        setPassword('');
                        setPassword2('');
                                
                            
                    }}
                >
                <Text style={style.text} >Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.button}
                    onPress={ () => props.navigation.goBack()}
                >
                <Text style={style.text} >Back Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView >
    );
}

const style = StyleSheet.create({
    input: {
        fontSize: 20,
        width: width / 1.2,
        height: 48,
        backgroundColor: 'rgba(28, 89, 96, .7)',
        color: 'rgba(255, 255, 255, .9)',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        paddingLeft: 10,
        marginVertical: 5,
    },
    button: {
        backgroundColor: 'rgb(60, 136, 255)',
        paddingHorizontal: 25,
        marginVertical: 5,
        width: width / 1.955,
        height: 40,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export default NewAccount;