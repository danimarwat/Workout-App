import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true); // Start loading
    setErrorMessage(''); // Clear any previous error message

    try {
      // Attempt to sign in
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

      // Navigate to Dashboard
      navigation.replace('Dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Incorrect email or password.'); // Display error message
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo.png')} // Replace with your logo path
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#888"
      />

      {/* Forgot Email or Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.navigableText}>Forgot your email or password?</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {isLoading ? (
        <ActivityIndicator size="large" color="#004d40" style={styles.loading} />
      ) : (
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000', // Black background color
  },
  logo: {
    width: 180, // Increased logo size
    height: 180, // Logo height
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 30, // Bigger title size
    fontWeight: 'bold',
    color: '#fff', // White title color
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    color: '#000',
  },
  button: {
    padding: 15,
    backgroundColor: '#004d40',
    borderRadius: 25,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  loading: { marginVertical: 10 },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  navigableText: {
    color: '#fff', // White color for the text
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'right', // Align text to the right
    width: '80%', // Matches input field width
  },
  footer: { flexDirection: 'row', marginTop: 20 },
  footerText: { fontSize: 16, color: '#fff' }, // Footer text color white
  registerText: { fontSize: 16, color: '#004d40', fontWeight: 'bold' }, // Register word remains green
});
