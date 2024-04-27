import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';
import AuthContext from '../../contexts/AuthProvider';
import { useNavigation } from '@react-navigation/native';
export default function CreateChannelForm({setFlag}) {
    const navigation=useNavigation();
    const { theme } = useContext(ThemeContext);
    const [channelName, setChannelName] = useState('');
    const [description, setDescription] = useState('');
    const [interests, setInterests] = useState([]);
    const [selectedInterest, setSelectedInterest] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const apiUrl = KeyCenter.apiUrl;
    const {user}=useContext(AuthContext);
    const {id,token}=user;
    // Function to fetch interests from API
    useEffect(() => {
        const fetchInterests = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/interests/getallinterests`);
                if (response.status === 200) {
                    setInterests(response.data.interests);
                }

            } catch (error) {
                setError('Error fetching interests');
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchInterests();
    }, []);

    // Function to handle interest selection
    const handleInterestSelect = (interestId) => {
        setSelectedInterest(interestId);
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            // Check if channel name, description, and selected interest are provided
            if (!channelName || !description || !selectedInterest) {
                setError('All fields are required');
                return;
            }
    
            // Make a POST request to create the channel
            const response = await axios.post(`${apiUrl}/channels/createchannel`, {
                name: channelName,
                description,
                creatorid: id, // Assuming you have the creator ID stored somewhere
                interest_id: selectedInterest,
            });
            console.log(response.data);
            // Check if the channel was created successfully
            if (response.status === 201) {
                // Show alert indicating channel submitted for approval
                Alert.alert('Success', 'Channel submitted for approval');
                // Navigate to the Creator screen
                // navigation.navigate('Creator');
                setFlag(prev=>!prev);
            } else {
                setError('Error creating channel');
            }
        } catch (error) {
            setError('Error creating channel');
            console.error('Error creating channel:', error);
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
            <TextInput
                style={[styles.input, { borderColor: theme === 'dark' ? '#fff' : 'gray', color: theme === 'dark' ? '#fff' : 'black' }]}
                placeholder="Channel Name"
                placeholderTextColor={theme === 'dark' ? '#ccc' : 'gray'}
                value={channelName}
                onChangeText={text => setChannelName(text)}
            />
            <TextInput
                style={[styles.input, styles.textArea, { borderColor: theme === 'dark' ? '#fff' : 'gray', color: theme === 'dark' ? '#fff' : 'black' }]}
                placeholder="Description"
                placeholderTextColor={theme === 'dark' ? '#ccc' : 'gray'}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={text => setDescription(text)}
            />
            <FlatList
                horizontal
                data={interests}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            theme === 'light' ? styles.buttonLight : styles.button,
                            selectedInterest === item.id ? styles.selectedButton : null,
                        ]}
                        onPress={() => handleInterestSelect(item.id)}
                    >
                        <Text style={{ color: selectedInterest === item.id ? 'white' : (theme === 'dark' ? 'white' : 'black') }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />


            <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
                <Text style={styles.createButtonText}>Create Channel</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical:20
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white"
    },
    buttonLight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "black"
    },
    selectedButton: {
        backgroundColor: 'gray',
    },
    selectedButtonText: {
        color: 'white',
    },
    createButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    flatListContent: {
        marginTop: 10,
    },
});
