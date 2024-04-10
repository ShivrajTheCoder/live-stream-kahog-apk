import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import axios from 'axios';
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';

const data = [
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575265/kj%20images/cover_2_bgvidc.jpg",
    id: 1,
    size: 93,
    episodes: 1,
    name: "Kavita Ek Vishwaas"
  },
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575265/kj%20images/cover_2_bgvidc.jpg",
    id: 2,
    size: 30,
    episodes: 3,
    name: "Kavita Ek Vishwaas"
  },
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575265/kj%20images/cover_2_bgvidc.jpg",
    id: 3,
    size: 25,
    episodes: 5,
    name: "Kavita Ek Vishwaas"
  },
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575265/kj%20images/cover_2_bgvidc.jpg",
    id: 4,
    size: 100,
    episodes: 2,
    name: "Kavita Ek Vishwaas"
  },
];

export default function QuickPlayContainer({ selCat }) {
  const apiUrl = KeyCenter.apiUrl;
  const { selId = 0, name = "all" } = selCat;
  const { theme } = useContext(ThemeContext);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        let apiUrlToUse = `${apiUrl}/podcasts/getallpodcasts`;
        if (selCat) {
          apiUrlToUse = `${apiUrl}/podcasts/getpodcastsbycategory/6`;
        }
        console.log(apiUrlToUse);
        const response = await axios.get(apiUrlToUse);
        if (response.status === 200) {
          // console.log(response.data.podcasts);
          setPodcasts(response.data.podcasts);
        } else {
          console.error('Failed to fetch podcasts:', response.statusText);
          setError('Failed to fetch podcasts');
        }
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        setError('Error fetching podcasts');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [selCat]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error || !podcasts || podcasts.length === 0) {
    return <Text>No content found.</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Continue Playing for {name}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {podcasts.map(item => (
            <View key={item.id} style={styles.card}>
              <Image style={styles.cover} source={{ uri: `https://res.cloudinary.com/dushmacr8/image/upload/v1707575265/kj%20images/cover_2_bgvidc.jpg` }} />
              <View style={styles.details}>
                <Text style={[styles.name, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.name}</Text>
                <View style={styles.character}>
                  <Text style={[styles.episodes, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.episodes} Episodes</Text>
                  <Text style={[styles.episodes, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.size} MB</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
  cover: {
    height: 120,
    width: 150,
    borderRadius: 10,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },
  character: {
    flexDirection: "row",
  },
  episodes: {
    fontSize: 13,
    fontWeight: "300",
    marginHorizontal: 10
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    marginHorizontal: 10
  }
});
