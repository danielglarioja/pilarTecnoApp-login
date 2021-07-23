import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actions } from '../store';

const { height, width } = Dimensions.get('window');

const Profile = props => {

    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        const { user } = props;
        console.log('user profile: ' + JSON.stringify(user));
        setEmail(user.providerData[0].email);
        setPhotoURL(user.providerData[0].photoURL);
        setName(user.providerData[0].displayName);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground
                style={{ height }}
                source={require('../assets/images/Lamp.jpg')}
            >
                <View style={styles.content}>
                    <View style={{ alignItems: 'center', paddingTop: height / 3 }}>
                        {photoURL ?
                            <Avatar
                                rounded
                                source={{ uri: photoURL }}
                                size='xlarge'
                            />
                            : 
                            <Avatar
                                rounded
                                source={require('../assets/images/avatar.png')}
                                size='xlarge'
                            />
                        }
                        <View style={styles.dataContainer}>
                            <Text style={styles.infoText}>{email}</Text>
                            {
                                name ?
                                    <Text style={styles.infoText}>{name}</Text>
                                : 
                                    <Text style={styles.infoText}>Username</Text>
                            }
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, top: 50, width, paddingLeft: width / 5, paddingRight: width / 5, paddingTop: height / 12 }}>
                    <Button
                        title='Exit' 
                        onPress={() => {
                        auth()
                            .signOut()
                            .then(async () => {
                                console.log('User signed out!'),
                                    props.setUser({ user: null })
                                try {
                                    await AsyncStorage.removeItem('isloged');
                                    // await AsyncStorage.delItem('isloged');
                                }
                                catch (e) {
                                    console.log('There was a error:' + e)
                                }
                            })
                            .catch(err => console.log(err));
                    }} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        flex: 1,
        top: 50,
        justifyContent: 'center',
    },
    dataContainer: {
        top: 50,
        width
    },
    infoText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'
    }
});

const mapDispatchToProps = dispatch => ({
    setUser: ({ user }) =>
        dispatch(actions.user.setUser({ user })),
});

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps, mapDispatchToProps)((Profile));