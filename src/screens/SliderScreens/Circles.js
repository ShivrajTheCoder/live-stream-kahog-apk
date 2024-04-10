import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text, View } from 'react-native';

import axios from 'axios';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import CircleTile from '../../components/HomeComponents/SliderComponents/CirleTiles';

export default function Circles() {
  const { theme } = useContext(ThemeContext);
  const apiUrl = KeyCenter.apiUrl;
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCircles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/circles/getallcircles`);
        if (response.status === 200) {
          console.log(response.data.circles);
          setCircles(response.data.circles);
        } else {
          setError('Failed to fetch circles');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCircles();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && <Text>Error: {error}</Text>}
      {!loading && !error && circles.map(circle => (
        <CircleTile key={circle.id} circle={circle} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
