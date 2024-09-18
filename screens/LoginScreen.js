// screens/LoginScreen.js
import React from 'react';
import { View, StyleSheet, ImageBackground, Animated, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Animation setup
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    navigation.navigate('Products');
  };

  return (
    <ImageBackground source={require('../assets/woodbackground.png')} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {}
        <Image source={require('../assets/title.png')} style={styles.titleImage} />

        <TextInput
          mode="flat"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          theme={{
            roundness: 25,
            colors: {
              primary: '#4B2E19',
              text: '#4B2E19',
              placeholder: '#A9A9A9',
              background: '#FFFFFF',
            }
          }}
        />
        <TextInput
          mode="flat"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          theme={{
            roundness: 25,
            colors: {
              primary: '#4B2E19',
              text: '#4B2E19',
              placeholder: '#A9A9A9',
              background: '#FFFFFF',
            }
          }}
        />
        {}
        <TouchableOpacity onPress={handleLogin} style={styles.imageButton}>
          <Image source={require('../assets/button.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.link}
        >
          <Text style={styles.linkText}>'No account? Tap here to register'</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
    paddingHorizontal: 20,
    paddingTop: 60, // Move elements up by decreasing paddingTop
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  titleImage: {
    width: 350,  // Adjust the width as needed
    height: 300, // Adjust the height as needed
    resizeMode: 'contain',
    marginBottom: 40, // Increased space between title and inputs
  },
  input: {
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: 20, // Adjust font size for visibility
    paddingTop: 2, // Add padding to move text down
    paddingBottom: 14.5, // Add padding to move text up
    paddingLeft: 10, // Add left padding for text spacing
    textAlign: 'left', // Align text to the left
  },
  imageButton: {
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'center',
  },
  buttonImage: {
    width: 240,
    height: 130,
    resizeMode: 'contain',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#4B2E19',
  },
});

export default LoginScreen;
