import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    Dimensions,
    StyleSheet,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const Posts = () => {
    return (
        <SafeAreaView>
            <ImageBackground
                style={{ height, paddingLeft: width/4, paddingTop: height/3 }}
                source={require('../assets/images/Lamp.jpg')}
            >
                <View style={styles.box} >
                    <Text style={styles.text} >
                        Posts
                    </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center'
    },
    box: {
      margin: width / 20,
      height: width / 2.5,
      width: width / 2.5,
      borderRadius: 15,
      justifyContent: 'center',
      backgroundColor: 'rgba(28, 89, 96, .7)',
      zIndex: 1
    }
});

export default Posts;
