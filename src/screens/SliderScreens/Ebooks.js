import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

export default function Ebooks() {
    const apiUrl = KeyCenter.apiUrl;
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEbooks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ebooks/getallebooks`);
                if (response.status === 200) {
                    console.log(response.data);
                    setEbooks(response.data.ebooks);
                } else {
                    console.error('Failed to fetch ebooks:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching ebooks:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEbooks();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error || ebooks.length === 0) {
        return <Text>No ebooks found.</Text>;
    }

    return (
        <ScrollView>
            {ebooks.map(ebook => (
                <View key={ebook.id} style={styles.container}>
                    <Image source={{ uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575265/kj%20images/cover_2_bgvidc.jpg" }} style={styles.cover} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{ebook.title}</Text>
                        <Text style={styles.description}>{ebook.description}</Text>
                        <Text style={styles.date}>{ebook.created_at}</Text>
                        {/* Add more ebook details as needed */}
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
        borderBottomColor: '#ccc',
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
        color: '#888',
    },
});
