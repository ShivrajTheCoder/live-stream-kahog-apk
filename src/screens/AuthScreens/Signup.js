import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

export default function Signup({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const { apiUrl } = KeyCenter;
  const handleInterestSelection = (interest) => {
    // Toggle interest selection
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  useEffect(() => {
    // Fetch interests on component mount
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      // Simulating interests data
      const mockInterests = ['Sports', 'Music', 'Movies', 'Books', 'Travel'];
      setInterests(mockInterests);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  const handleSignup = async () => {
    // Validation logic
    if (!fullname || !username || !email || !address || !phone || interests.length === 0 || !password || !confirmPassword || !gender) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Log all information
    console.log('Signup Information:');
    console.log('Full Name:', fullname);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Phone:', phone);
    console.log('Interests:', interests);
    console.log('Password:', password);
    console.log('Gender:', gender);
    try {
      const resp = await axios.post(`${apiUrl}/auth/cretorsignup`, {
        full_name:fullname,username,email_id:email,address,phone,interests,password,gender
      })
      console.log(resp.data);
      if (resp.status === 201) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Signup', `signup failed`+error);
    }
    // Implement your signup logic here
    // Alert.alert('Signup', `Signing up with email: ${email}`);
  
  };


  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.stepContainer}>
        <Text style={[styles.heading, isDarkMode && styles.headingDark]}>Step 1: Personal Information</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setFullname(text)}
          value={fullname}
          placeholder="Full Name"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setUsername(text)}
          value={username}
          placeholder="Username"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setAddress(text)}
          value={address}
          placeholder="Address"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setPhone(text)}
          value={phone}
          placeholder="Phone"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.stepContainer}>
        <Text style={[styles.heading, isDarkMode && styles.headingDark]}>Step 2: Interests</Text>
        <View style={styles.interestsContainer}>
          {interests.map((interest, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.interestButton, isDarkMode && styles.interestButtonDark]}
              onPress={() => handleInterestSelection(interest)}>
              <Text style={[styles.interestButtonText, isDarkMode && styles.interestButtonTextDark]}>{interest}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.stepContainer}>
        <Text style={[styles.heading, isDarkMode && styles.headingDark]}>Step 3: Account Information</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.inputDark]}
          onChangeText={text => setGender(text)}
          value={gender}
          placeholder="Gender"
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
        />
      </View>
      <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={handleSignup}>
        <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Signup</Text>
      </TouchableOpacity>
      <Text style={[styles.loginText, isDarkMode && styles.loginTextDark]}>Already have an account? Login</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  stepContainer: {
    marginBottom: 20,
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  interestButton: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  interestButtonDark: {
    backgroundColor: '#333',
  },
  interestButtonText: {
    color: '#333',
    fontSize: 14,
  },
  interestButtonTextDark: {
    color: 'white',
  },
});
