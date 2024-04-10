import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';


export default function ChannelContainer({ category }) {
  const { theme } = useContext(ThemeContext);
  const apiUrl = KeyCenter.apiUrl;
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/channels/getchannelsbycategory/${category.id}`
        );
        if (response.status === 200) {
          console.log(response.data);
          setChannels(response.data.channels);
        } else {
          console.error('Failed to fetch channels:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  const handleJoinChannel = (channelId) => {
    // Add your logic for joining a channel here
    console.log(`Joining channel ${channelId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
      <Text style={[styles.categoryName, { color: theme === 'dark' ? '#fff' : '#000' }]}>
        {category.category_name}
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : channels.length === 0 ? (
        <Text>No channels found</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {channels.map(channel => (
            <View key={channel.id} style={styles.channelCard}>
              <Text style={[styles.channelName, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                {channel.name}
              </Text>
              <Text style={styles.channelDescription}>{channel.description}</Text>
              <TouchableOpacity
                style={[styles.joinButton, { backgroundColor: theme === 'dark' ? '#555' : '#007bff' }]}
                onPress={() => handleJoinChannel(channel.id)}
              >
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  channelCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    minWidth: 150,
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
