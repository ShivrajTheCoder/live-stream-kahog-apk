import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

export default function Pathshala() {
  const [pathshalas, setPathshalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = KeyCenter.apiUrl;

  useEffect(() => {
    const fetchPathshalas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pathshala/getallpathshala`);
        // console.log(response.data.pathshalas);
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
        <Text style={styles.heading}>Pathshalas</Text>
        {pathshalas.map(pathshala => (
          <View key={pathshala.id} style={styles.pathshalaContainer}>
            <Text style={styles.pathshalaName}>{pathshala.name}</Text>
            <Text style={styles.pathshalaDetails}>Description: {pathshala.description}</Text>
            <TouchableOpacity
              style={styles.joinButton}
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
  pathshalaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
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
