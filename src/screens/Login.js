import React, { useState } from 'react';
import {
    SafeAreaView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';
import { actions } from '../store';
import { Alert } from 'react-native';

GoogleSignin.configure({
    webClientId: '499131793161-7q304qfvn7pv53sapl85frpqr01hhd29.apps.googleusercontent.com',
});

const { height, width } = Dimensions.get('window');

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    return (
        <SafeAreaView>
            <ImageBackground
                style={{ 
                    // flex: 1,
                    height, 
                    paddingLeft: width / 6, 
                    paddingRight: width / 6, 
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                source={require('../assets/images/fondo6.jpg')}
            >
                <GoogleSigninButton
                    style={{ width: 180, height: 65 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => onGoogleButtonPress()
                        .then(async (data) => {
                            if (data) {
                                console.log('res login: ' + JSON.stringify(data.user));
                                try {
                                    await AsyncStorage.setItem('isloged', JSON.stringify(data.user));
                                } catch (e) {
                                    console.log('There was a error:' + e);
                                }
                                props.setUser(data.user);
                            }
                        })
                        .catch(err => console.log(`catch ${err}`))
                    }
                />
                <TextInput
                    style={style.input}
                    value={email}
                    placeholder='Ingresar email'
                    placeholderTextColor='rgba(255, 255, 255, 1)'
                    onChangeText={(e) => setEmail(e)}
                />
                <TextInput
                    style={style.input}
                    value={password}
                    placeholder='Contraseña'
                    placeholderTextColor='rgba(255, 255, 255, 1)'
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword(e)}
                />
                
                <TouchableOpacity
                    style={style.button}
                    onPress={() => { 
                        email & password ?
                            auth().signInWithEmailAndPassword(email, password)
                            .then(async data => {
                            console.log('Signed in with e-mail!');                    
                            if (data) {
                                console.log('res login: ' + JSON.stringify(data.user));
                                try {
                                await AsyncStorage.setItem(
                                    'isloged',
                                    JSON.stringify(data.user),
                                );
                                } catch (e) {
                                console.log('There was a error:' + e);
                                }
                                props.setUser(data.user);
                            }
                            }).catch (err => {console.log(err)})
                        : 
                            Alert.alert('Complete all fields');
                    }}
                >
                    <Text style={style.text} >Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    //style={style.button}
                    onPress={() => props.navigation.navigate('NewAccount')}
                >
                    <Text style={style.text} >Registrarse</Text>
                </TouchableOpacity>
                
            </ImageBackground>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    input: {
        fontSize: 20,
        width: width / 1.3,
        height: 45,
        backgroundColor: 'rgba(143, 148, 152, 0.5)',
        color: 'rgba(255, 255, 255, 1)',
        borderWidth: 1.5,
        borderColor: '#fff', 
        borderRadius: 5,
        paddingLeft: 10,
        marginVertical: 12,
    },
    button: {
        backgroundColor: 'rgb(60, 136, 255)',
        paddingHorizontal: 20,
        marginVertical: 7,
        width: width / 1.955,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
    }
});

const mapDispatchToProps = dispatch => ({
    setUser: (data) =>
        dispatch(actions.user.setUser(data)),
});

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)((Login));