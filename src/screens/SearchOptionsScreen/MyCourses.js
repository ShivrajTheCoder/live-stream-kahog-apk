import React, { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import BackButton from '../../components/BackButton';

export default function MyCourses() {
    const { theme } = useContext(ThemeContext);
    const apiUrl = KeyCenter.apiUrl;
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setError(null);
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/videos/getallvideos`);
                if (response.status === 200) {
                    const { videos } = response.data;
                    //   console.log(videos);
                    setVideos(videos);
                } else {
                    console.error('Failed to fetch videos:', response.statusText);
                    setError('Failed to fetch videos');
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError('Error fetching videos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <BackButton screen='My Courses' to='Home' />
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                    <Text style={[styles.errorText, { color: theme === 'dark' ? 'white' : 'black' }]}>Error: {error}</Text>
                ) : (
                    <ScrollView style={styles.tileScroll}>
                        {videos.map((video, index) => (
                            <View style={styles.tileCont} key={index} >
                                <View style={styles.liveInfo}>
                                    <Image style={styles.image} source={{ uri: `https://res.cloudinary.com/dushmacr8/image/upload/v1707575264/kj%20images/audiocover3_oxgkjv.jpg` }} />
                                    <View style={styles.details}>
                                        <Text style={[styles.name, { color: theme === 'dark' ? 'white' : 'white' }]}>Satish Thakral</Text>
                                        <Text style={[styles.name, { color: theme === 'dark' ? 'white' : 'white' }]}>Course Name</Text>
                                    </View>
                                </View>
                                <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'white' }]}>{video.title}</Text>
                                <Button title="Listen Now" style={styles.button}
                                    color="#FF8C00" // Orange color
                                    titleColor="#000000" />
                            </View>
                        ))}
                    </ScrollView>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 10,
    },
    text: {
        fontSize: 15,
        fontWeight: "900",
        marginHorizontal: 10
    },
    tileScroll: {
        marginTop: 10,
        marginBottom: 10,
    },
    tileCont: {
        display: "flex",
        flexDirection: "column",
        margin: 10,
        backgroundColor: "#0077b6",
        borderRadius: 5,
    },
    image: {
        height: 70,
        width: 150
    },
    liveInfo: {
        display: "flex",
        flexDirection: "row",
        paddingRight: 10
    },
    details: {
        marginLeft: 10,
        height: "full",
        width: "full",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontSize: 12,
    },
    button: {
        height: 50,
        width: "full",

    },
    heading: {
        fontSize: 15,
        fontWeight: "500",
        marginVertical: 2,
        marginHorizontal: 4
    }
})
