import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Signup() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState([]);
  const [setSelectedInterests, setSelInt] = useState([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // Placeholder for profile picture
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${apiUrl}/interests/getallinterests`);
        if (response.status === 200) {
          const { interests } = response.data;
          setInterests(interests);
        } else {
          console.error('Failed to fetch interests:', response.statusText);
          setError('Failed to fetch interests');
        }
      } catch (error) {
        console.error('Error fetching interests:', error);
        setError('Error fetching interests');
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, []);
  const handleSignup = () => {
    // Validation logic
    if (!fullname || !username || !email || !address || !phone || interests.length === 0 || !password || !confirmPassword || !gender) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Implement your signup logic here
    Alert.alert('Signup', `Signing up with email: ${email}`);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.heading, isDarkMode && styles.headingDark]}>Signup</Text>
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
      {
        !loading && !error &&
        <View style={styles.interestsContainer}>
          <Text style={[styles.interestsLabel, isDarkMode && styles.interestsLabelDark]}>Interests</Text>
          <View style={styles.interestsList}>
            {interests.map((interest, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.interestButton, isDarkMode && styles.interestButtonDark]}
                onPress={() => setSelectedInterests(prev => [...prev, interest])}>
                <Text style={[styles.interestButtonText, isDarkMode && styles.interestButtonTextDark]}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      }
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
