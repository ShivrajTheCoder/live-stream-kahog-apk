import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark';

    const handleLogin = () => {
        if (!phoneNumber || !password) {
            Alert.alert('Error', 'Phone number and password are required');
            return;
        }
        // Implement your login logic here
        Alert.alert('Login', `Logging in with phone number: ${phoneNumber}`);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <Text style={[styles.heading, isDarkMode && styles.headingDark]}>Welcome to Kaho G</Text>
            <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
                placeholder="Phone Number"
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
                keyboardType="phone-pad"
            />
            <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Password"
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
                secureTextEntry={true}
            />
            <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={handleLogin}>
                <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Login</Text>
            </TouchableOpacity>
            <Text style={[styles.signupText, isDarkMode && styles.signupTextDark]}>Don't have an account? Try signing up</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
    },
    headingDark: {
        color: 'white',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: 'black',
    },
    inputDark: {
        backgroundColor: '#333',
        color: 'white',
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
        color: 'white',
        fontSize: 18,
        fontWeight:"bold"
    },
    buttonTextDark: {
        color: 'white',
    },
    signupText: {
        fontSize: 16,
        color: 'blue',
    },
    signupTextDark: {
        color: 'lightblue',
    },
});
