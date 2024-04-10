import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import BhajanTile from './Tiles';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import axios from 'axios';
import LiveSoonBottomCard from '../BottomSheets/LiveSoonBottomCard';





export default function UpcomingLiveContainer() {
  const { theme } = useContext(ThemeContext); // Access theme from ThemeContext
  const apiUrl = KeyCenter.apiUrl;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [lives, setLives] = useState([]);
  useEffect(() => {
    setError(null);
    const fetchTopLives = async () => {
      try {
        const response = await axios.get(`${apiUrl}/lives/getTop5LiveEvents`);
        console.log(response.data.top5LiveEvents);
        if (response.status === 200) {
          setLives(response.data.top5LiveEvents);
        } else {
          console.error('Failed to fetch top lives:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching top lives:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTopLives();
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Going Live Soon</Text>
      <ScrollView horizontal={true} style={styles.tileScroll} showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          lives.map((live, index) => (
            <LiveSoonBottomCard
              key={index}
              name={live.topic} // You may need to adjust this depending on your API response structure
              courseName={"ongoing"} // You may need to adjust this depending on your API response structure
              imageUrl={"https://res.cloudinary.com/dushmacr8/image/upload/v1707575264/kj%20images/audiocover3_oxgkjv.jpg"} // You may need to adjust this depending on your API response structure
              heading={live.description} // You may need to adjust this depending on your API response structure
              start_date={live.start_date}
              start_time={live.start_time}
              end_time={live.end_time}
            />
          ))
        )}
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
