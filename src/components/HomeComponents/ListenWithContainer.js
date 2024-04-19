import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SongTile from './Tiles';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import axios from 'axios';

export default function ListenWithContainer() {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [content, setContent] = useState([]);
  const apiUrl = KeyCenter.apiUrl;

  useEffect(() => {
    setError(null);
    const fetchTopOriginals = async () => {
      try {
        const response = await axios.get(`${apiUrl}/podcasts/getorginalpodcasts`);
        if (response.status === 200) {
          setContent(response.data.originalPodcasts);
        } else {
          console.error('Failed to fetch top originals:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching top originals:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTopOriginals();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Listen with Kaho G</Text>
      <ScrollView horizontal={true} style={styles.tileScroll} showsHorizontalScrollIndicator={false}>
        <View style={styles.tileCont}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            content.map(item => (
              <SongTile key={item.id} item={item} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tileScroll: {
    marginTop: 10,
    marginBottom: 10,
  },
  tileCont: {
    display: "flex",
    flexDirection: "row",
  },
});
