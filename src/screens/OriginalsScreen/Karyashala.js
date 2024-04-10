import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

export default function Karyashala() {
  const [karyashalas, setKaryashalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = KeyCenter.apiUrl;

  useEffect(() => {
    const fetchKaryashalas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/karyashala/getallkaryashala`);
        setKaryashalas(response.data.karyashalas);
        setLoading(false);
      } catch (error) {
        setError(error.message);
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Karyashala</Text>
        {karyashalas.map(karyashala => (
          <View key={karyashala.id} style={styles.karyashalaContainer}>
            <Text style={styles.karyashalaName}>{karyashala.karyashala_name}</Text>
            <Text style={styles.karyashalaDetails}>Description: {karyashala.description}</Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => handleJoinKaryashala(karyashala.id)}
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
  karyashalaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
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
