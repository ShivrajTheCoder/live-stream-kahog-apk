import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Karyashala() {
  const [karyashalas, setKaryashalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const apiUrl = KeyCenter.apiUrl;

  useEffect(() => {
    const fetchKaryashalas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/karyashala/getallkaryashala`);
        console.log(response.data.karyashalas);
        if (response.status === 200) {
          setKaryashalas(response.data.karyashalas);
        } else {
          setKaryashalas([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKaryashalas();
  }, []);

  const handleJoinKaryashala = (karyashalaId) => {
    // Implement your logic to join a karyashala here
    console.log(`Joined karyashala with ID: ${karyashalaId}`);
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
    <ScrollView style={{ backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: theme === 'dark' ? '#fff' : '#000' }]}>Karyashala</Text>
        {karyashalas.map(karyashala => (
          <View key={karyashala.id} style={[styles.karyashalaContainer, { backgroundColor: theme === 'dark' ? '#444' : '#f0f0f0' }]}>
            <Image source={{ uri: karyashala.thumbnail }} style={styles.coverImage} />
            <Text style={[styles.karyashalaName, { color: theme === 'dark' ? '#fff' : '#000' }]}>{karyashala.karyashala_name}</Text>
            <Text style={[styles.karyashalaDetails, { color: theme === 'dark' ? '#ccc' : '#555' }]}>Description: {karyashala.description}</Text>
            <TouchableOpacity
              style={[styles.joinButton, { backgroundColor: theme === 'dark' ? 'blue' : '#007bff', width: '100%' }]}
              onPress={() => handleJoinKaryashala(karyashala.id)}
            >
              <Text style={styles.joinButtonText}>View</Text>
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
  karyashalaContainer: {
    width: 280, // Fixed width
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  karyashalaName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  karyashalaDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  coverImage: {
    width: 280, // Adjusted width
    height: 180, // Adjusted height
    borderRadius: 10,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#ade8f4',
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
