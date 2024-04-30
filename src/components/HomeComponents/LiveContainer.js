import React, { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import LiveCardBottomSheet from '../BottomSheets/LiveCardBottomSheet';
import KeyCenter from '../../KeyCenter';
import axios from 'axios';

export default function LiveContainer({ fooLive = true }) {
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
            {fooLive && <Text style={[styles.text, { color: theme === 'dark' ? 'white' : 'black' }]}>Live Now</Text>}
            {!fooLive && <Text style={[styles.text, { color: theme === 'dark' ? 'white' : 'black' }]}>Mentor Courses</Text>}
            {loading ? (
                <Text style={[styles.text, { color: theme === 'dark' ? 'white' : 'black' }]}>Loading...</Text>
            ) : error ? (
                <Text style={[styles.text, { color: theme === 'dark' ? 'white' : 'black', height:100,  display:"flex" ,justifyContent:"center",alignItems:"center" }]}>No live events currently</Text>
            ) : lives.length === 0 ? (
                <Text style={[styles.text, { color: theme === 'dark' ? 'white' : 'black', height:100,  display:"flex" ,justifyContent:"center",alignItems:"center" }]}>No live events currently</Text>
            ) : (
                <ScrollView horizontal={true} style={styles.tileScroll} showsHorizontalScrollIndicator={false}>
                    {lives.map((live, index) => (
                        <LiveCardBottomSheet
                            live={live}
                            liveID={live.id}
                            key={index}
                            name={live.topic} // You may need to adjust this depending on your API response structure
                            courseName={"ongoing"} // You may need to adjust this depending on your API response structure
                            imageUrl={live.thumbnail} // You may need to adjust this depending on your API response structure
                            heading={live.description} // You may need to adjust this depending on your API response structure
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundcolor: "black",
        padding: 10,
    },
    text: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold"
    },
    tileScroll: {
        marginTop: 10,
        marginBottom: 10,
    },
});
