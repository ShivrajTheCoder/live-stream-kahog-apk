import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';

export default function AudioBooks() {
    const apiUrl = KeyCenter.apiUrl;
    const [audiobooks, setAudioBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchAudioBooks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/audioBooks/getAllAudioBooks`);
                // console.log(response.data.audios);
                if (response.status === 200) {
                    // console.log(response.data.audios);
                    setAudioBooks(response.data.audios);
                } else {
                    console.error('Failed to fetch audiobooks:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching audiobooks:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAudioBooks();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error || audiobooks.length === 0) {
        return <Text>No audio books found.</Text>;
    }

    return (
        <ScrollView style={{ backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
            {audiobooks.map(audiobook => (
                <View key={audiobook.id} style={[styles.container, { borderColor: theme === 'dark' ? '#888' : '#ccc' }]}>
                    <Image source={{ uri: audiobook.cover_path }} style={styles.cover} />
                    <View style={styles.details}>
                        <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>{audiobook.title}</Text>
                        <Text style={[styles.description, { color: theme === 'dark' ? '#ddd' : '#555' }]}>{audiobook.description}</Text>
                        <Text style={[styles.date, { color: theme === 'dark' ? '#aaa' : '#888' }]}>{audiobook.created_at}</Text>
                        {/* Add more audiobook details as needed */}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
    },
    cover: {
        width: 175,
        height: 150,
        marginRight: 10,
        borderRadius:10
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
    },
});
