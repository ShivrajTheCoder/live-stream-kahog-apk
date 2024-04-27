import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests
import KeyCenter from '../../KeyCenter';
import ChannelCard from './ChannelCard';
import ThemeContext from '../../contexts/ThemeProvider';
import AuthContext from '../../contexts/AuthProvider';

export default function CreatorChannelContainer() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const apiUrl = KeyCenter.apiUrl;
  const { user } = useContext(AuthContext);
  const { id, token } = user;
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    setError(null);
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`${apiUrl}/channels/getcreatorchannels/${id}`);
        console.log(response.data,"here are your");
        if (response.status === 200) {
          console.log(response.data);
          setChannels(response.data.channels);
        } else {
          setError('Failed to fetch channels: ' + response.statusText); // Set error message
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
        setError('Error fetching channels: ' + error.message); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return (
    <View>
      <Text style={[styles.heading, { color: theme === 'dark' ? '#fff' : '#000' }]}>My Channels</Text>
      <ScrollView contentContainerStyle={{ marginVertical: 10 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? ( // Render error message if error state is not null
          <Text style={{color:"red"}}>No approved channels yet</Text> // Display error message
        ) : (
          channels.map(channel => (
            <ChannelCard key={channel.id} channel={channel} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
