import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

export default function QuickPlayContainer({ selCat }) {
  const apiUrl = KeyCenter.apiUrl;
  const { selId = 0, name = "all" } = selCat;
  const { theme } = useContext(ThemeContext);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        let apiUrlToUse = `${apiUrl}/podcasts/getallpodcasts`;
        if (selId !== 0) {
          apiUrlToUse = `${apiUrl}/podcasts/getpodcastsbycategory/${selId}`;
        }
        console.log(apiUrlToUse);
        const response = await axios.get(apiUrlToUse);

        if (response.status === 200) {
          setPodcasts(response.data.podcasts);
          console.log(response.data.podcasts);
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
  }, [selCat, selId]);

  const handleItemClick = (item) => {
    // console.log(item,"here is the item");
    if (item.isVideo === 1) {
      navigation.navigate('VideoPlay');
    } else {
      navigation.navigate('AudioPlay');
    }
  };


  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error || !podcasts || podcasts.length === 0) {
    return <Text>No content found.</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>
        Continue Playing for {name}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {podcasts.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleItemClick(item)}
            >
              <Image style={styles.cover} source={{ uri: item.thumbnail }} />
              <View style={styles.details}>
                <Text style={[styles.name, { color: theme === 'dark' ? 'white' : 'black' }]}>
                  {item.name}
                </Text>
                <View style={styles.character}>
                  <Text style={[styles.episodes, { color: theme === 'dark' ? 'white' : 'black' }]}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
