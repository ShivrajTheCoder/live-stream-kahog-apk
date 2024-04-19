import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Pathshala() {
  const [pathshalas, setPathshalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const apiUrl = KeyCenter.apiUrl;

  useEffect(() => {
    const fetchPathshalas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pathshala/getallpathshala`);
        setPathshalas(response.data.pathshalas);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPathshalas();
  }, []);

  const handleJoinPathshala = (pathshalaId) => {
    // Implement your logic to join a pathshala here
    console.log(`Joined pathshala with ID: ${pathshalaId}`);
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
        <Text style={[styles.heading, { color: theme === 'dark' ? '#fff' : '#000' }]}>Pathshalas</Text>
        {pathshalas.map(pathshala => (
          <View key={pathshala.id} style={[styles.pathshalaContainer, { backgroundColor: theme === 'dark' ? '#444' : '#f0f0f0' }]}>
            <Text style={[styles.pathshalaName, { color: theme === 'dark' ? '#fff' : '#000' }]}>{pathshala.name}</Text>
            <Text style={[styles.pathshalaDetails, { color: theme === 'dark' ? '#ccc' : '#555' }]}>Description: {pathshala.description}</Text>
            <TouchableOpacity
              style={[styles.joinButton, { backgroundColor: theme === 'dark' ? 'blue' : '#007bff' }]}
              onPress={() => handleJoinPathshala(pathshala.id)}
            >
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pathshalaContainer: {
    width: 300, // Fixed width
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  pathshalaName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pathshalaDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  joinButton: {
    backgroundColor: '#ade8f4',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%', // Take up whole width
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
