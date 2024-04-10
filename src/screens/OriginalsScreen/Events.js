import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = KeyCenter.apiUrl;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/events/getallevents`);
        setEvents(response.data.events);
        setLoading(false);
      } catch (error) {
        setError(error.message);
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Events</Text>
        {events.map(event => (
          <View key={event.id} style={styles.eventContainer}>
            <Text style={styles.eventName}>{event.event_name}</Text>
            <Text style={styles.eventDetails}>Date: {new Date(event.event_date).toLocaleDateString()}</Text>
            <Text style={styles.eventDetails}>Type: {event.media_type}</Text>
            <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinEvent(event.id)}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10, // Adjust vertical margin as needed
    marginHorizontal: 5, // Adjust horizontal margin as needed
    minWidth: 340, // Minimum width of the event card
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
