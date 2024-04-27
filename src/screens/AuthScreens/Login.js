import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import AuthContext from '../../contexts/AuthProvider'; // Import AuthContext
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useContext(ThemeContext);
    const { login } = useContext(AuthContext); // Get login function from AuthContext
    const isDarkMode = theme === 'dark';
    const { apiUrl } = KeyCenter;
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required');
            return;
        }
        try {
            const resp = await axios.post(`${apiUrl}/auth/cretorlogin`, {
                email, password
            })
            if (resp.status === 200) {
                const token = resp.data.token;
                const { id } = resp.data.creator;
                console.log(token, id);
                login(id, token); // Dispatch update to AuthContext
                // Alert.alert('Login', `Logging in with email: ${email}`);
                navigation.navigate("Creator");
            }
        } catch (error) {
            Alert.alert('Login', `Login failed`+error);
        }


    };

    const handleSignup = () => {
        navigation.navigate('Signup'); // Navigate to Signup screen
    };

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            <Text style={[styles.heading, isDarkMode && styles.headingDark]}>Welcome to Kaho G</Text>
            <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Email"
                placeholderTextColor={isDarkMode ? 'white' : 'gray'}
                keyboardType="email-address"
                autoCapitalize="none"
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
            <TouchableOpacity onPress={handleSignup}>
                <Text style={[styles.signupText, isDarkMode && styles.signupTextDark]}>Don't have an account? Try signing up</Text>
            </TouchableOpacity>
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
        fontWeight: "bold"
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
