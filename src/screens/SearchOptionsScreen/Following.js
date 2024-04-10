import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import axios from 'axios';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import BackButton from '../../components/BackButton';

export default function Following() {
  const { theme } = useContext(ThemeContext);
  const apiUrl = KeyCenter.apiUrl;
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/creator/getallapprovedcreators`);
        if (response.status === 200) {
          console.log(response.data.creators);
          setMentors(response.data.creators);
        } else {
          console.error('Failed to fetch mentors:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching mentors:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <BackButton screen="Following" to="Home" />
      <View style={styles.headingCont}>
        <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>You Currently Follow</Text>
      </View>
      <View style={styles.mentorCont}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          mentors.map((mentor) => (
            <View key={mentor.id} style={styles.mentorCard}>
              <Image style={styles.profileImg} source={{ uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1709833529/kj%20images/profile_n5q8mg.png" }} />
              <Text style={[styles.name, { color: theme === 'dark' ? 'white' : 'black' }]}>{mentor.username || 'Name'}</Text>
              <Text style={styles.other}>{mentor.position || 'Position'}</Text>
              <Text style={styles.other}>{mentor.location || 'Location'}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  headingCont: {
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  mentorCont: {
    flexDirection: "row", // Set flexDirection to 'row'
    justifyContent: "space-around", // Align items with space around
    padding: 10,
    flexWrap: "wrap",
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  mentorCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    width: "45%",
    padding: 5,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 10,
  },
  name: {
    fontWeight: "bold",
    marginVertical: 5,
    fontSize: 15,
    marginBottom: 5,
  },
  other: {
    color: "#a3b18a",
  },
});
