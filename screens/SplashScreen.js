import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Register'); // Navigate to Register screen
  };

  return (
    <ImageBackground
      source={require('../assets/arnold.jpg')} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.highlightedTitle}>Workout Watcher</Text>
        <Text style={styles.description}>
          Get ready to embark on a journey of real-time fitness challenges, social interactions, and rewarding experiences. Let’s start creating your profile and setting up your first challenge!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for text readability
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: 'white',
    marginBottom: 5,
  },
  highlightedTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // Light green
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#004d40', // Light green color for the button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
