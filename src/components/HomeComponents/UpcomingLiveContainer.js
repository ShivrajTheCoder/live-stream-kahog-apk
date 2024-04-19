import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import axios from 'axios';
import LiveSoonBottomCard from '../BottomSheets/LiveSoonBottomCard';

export default function UpcomingLiveContainer() {
    const { theme } = useContext(ThemeContext);
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
                    <Text style={[styles.message, { color: theme === 'dark' ? 'white' : 'black' }]}>Loading...</Text>
                ) : error ? (
                    <Text style={[styles.message, { color: theme === 'dark' ? 'white' : 'black' },{height:100, width:"full" ,justifyContent:"center", alignItems:"center"}]}>No upcoming lives</Text>
                ) : lives.length === 0 ? (
                    <Text style={[styles.message, { color: theme === 'dark' ? 'white' : 'black' },{height:100, width:"full" ,justifyContent:"center", alignItems:"center"}]}>No upcoming live events</Text>
                ) : (
                    lives.map((live, index) => (
                        <LiveSoonBottomCard
                            key={index}
                            name={live.topic} // You may need to adjust this depending on your API response structure
                            courseName={"ongoing"} // You may need to adjust this depending on your API response structure
                            imageUrl={live.thumbnail} // You may need to adjust this depending on your API response structure
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
    message: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center',
    },
});
