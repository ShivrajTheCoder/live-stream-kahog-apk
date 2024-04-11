import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Signup() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  const handleSignup = () => {
    if (!phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Implement your signup logic here
    Alert.alert('Signup', `Signing up with phone number: ${phoneNumber}`);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.heading, isDarkMode && styles.headingDark]}>Welcome to Kaho G</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
        placeholder="Phone Number"
        placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        secureTextEntry={true}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder="Confirm Password"
        placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={handleSignup}>
        <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Signup</Text>
      </TouchableOpacity>
      <Text style={[styles.loginText, isDarkMode && styles.loginTextDark]}>Already have an account? Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  headingDark: {
    color: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#333',
  },
  inputDark: {
    color: '#ccc',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonDark: {
    backgroundColor: '#800000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonTextDark: {
    color: 'white',
  },
  loginText: {
    fontSize: 16,
    color: 'blue',
  },
  loginTextDark: {
    color: '#6495ED',
  },
});
