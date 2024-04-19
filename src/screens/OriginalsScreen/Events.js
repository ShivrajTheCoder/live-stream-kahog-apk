import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const apiUrl = KeyCenter.apiUrl;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/events/getallevents`);
        console.log(response.data.events);
        if(response.status===200){
          
          setEvents(response.data.events);
        }
        else{
          setEvents([]);
        }
        // setLoading(false);
      } catch (error) {
        setError(error.message);
        // setLoading(false);
      }
      finally{
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleJoinEvent = (eventId) => {
    // Implement your logic to join an event here
    console.log(`Joined event with ID: ${eventId}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#fff' : '#0000ff'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
        <Text style={[styles.errorText, { color: theme === 'dark' ? '#fff' : '#000' }]}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme === 'dark' ? '#fff' : '#000' }]}>Events</Text>
        {events.map(event => (
          <View key={event.id} style={[styles.eventContainer, { backgroundColor: theme === 'dark' ? '#444' : '#f0f0f0' }]}>
            <Text style={[styles.eventName, { color: theme === 'dark' ? '#fff' : '#000' }]}>{event.event_name}</Text>
            <Text style={[styles.eventDetails, { color: theme === 'dark' ? '#ccc' : '#555' }]}>Type:{event.media_type}</Text>
            <Text style={[styles.eventDetails, { color: theme === 'dark' ? '#ccc' : '#555' }]}>{event.description}</Text>
            {/* <TouchableOpacity
              style={[styles.joinButton, { backgroundColor: theme === 'dark' ? 'blue' : '#007bff' }]}
              onPress={() => handleJoinEvent(event.id)}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 13,
    marginBottom: 5,
  },
  joinButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
