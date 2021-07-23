import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

const { height, width } = Dimensions.get('window');

const Home = (props) => {

  const onHomePress = () => {
    Alert.alert(
      "Hi!!",
      "Ya te ecuentras en Home",
      [
        { text: "Ok", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ height, paddingTop: height / 30 }}
        source={require('../assets/images/Lamp.jpg')}
      >
        <View style={{ flexDirection: 'column', height, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => onHomePress()}
              style={styles.button}
            >
              <Text style={styles.text}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => props.navigation.navigate('Profile')}
              >
              <Text style={styles.text}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => props.navigation.navigate('Posts')}
              >
              <Text style={styles.text}>
                Posts
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => props.navigation.navigate('Map')}
              >
              <Text style={styles.text}>
                Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    margin: width / 25,
    height: width / 3.5,
    width: width / 2.5,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(28, 89, 96, .7)',
    zIndex: 1
  }
});

export default Home;