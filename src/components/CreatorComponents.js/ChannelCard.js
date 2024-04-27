import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook for navigation
import ThemeContext from '../../contexts/ThemeProvider';

export default function ChannelCard({ channel }) {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation(); // Hook for navigation
    const isApproved=channel.isApproved ? true : false;
    console.log(isApproved);
    const handleJoinChannel = (channelId) => {
        // Handle joining the channel here
    };

    const handleUploadContent = (channelId) => {
        navigation.navigate('Upload', { channelId: 20 }); // Navigate to the upload screen and pass channel ID as prop
    };

    return (
        <View key={channel.id} style={[styles.channelCard, { backgroundColor: theme === 'dark' ? '#007bff' : '#f0f0f0' }]}>
            <Text style={[styles.channelName, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                {channel.name}
            </Text>
            <Text style={[styles.channelDescription, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                {channel.description}
            </Text>
            <Text style={[styles.channelDescription, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                Cinema
            </Text>
            <View>
                {
                    isApproved && <TouchableOpacity
                    style={[styles.joinButton, { backgroundColor: theme === 'dark' ? '#555' : '#007bff' }]}
                    onPress={() => handleUploadContent(channel.id)}
                >
                    <Text style={styles.buttonText}>Upload Content</Text>
                </TouchableOpacity>
                }
                 
                 {
                    !isApproved && <TouchableOpacity
                    style={[styles.joinButton, { backgroundColor: theme === 'dark' ? '#555' : '#007bff' }]}
                >
                    <Text style={styles.buttonText}>Approval Pending</Text>
                </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    channelCard: {
        padding: 10,
        marginRight: 10,
        borderRadius: 8,
        minWidth: 150,
        marginVertical: 10
    },
    channelName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    channelDescription: {
        fontSize: 14,
    },
    joinButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
