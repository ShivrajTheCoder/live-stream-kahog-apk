import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Linking } from 'react-native'; // Import Linking module
import KeyCenter from '../../KeyCenter';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Ebooks() {
    const apiUrl = KeyCenter.apiUrl;
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchEbooks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ebooks/getallebooks`);
                if (response.status === 200) {
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

    const handleOpenPdf = (pdfUrl) => {
        Linking.openURL(pdfUrl);
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error || ebooks.length === 0) {
        return <Text>No ebooks found.</Text>;
    }

    return (
        <ScrollView style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
            {ebooks.map(ebook => (
                <TouchableOpacity key={ebook.id} onPress={() => handleOpenPdf("ebook.ebook_path")}>
                    <View style={[styles.container, { borderColor: theme === 'dark' ? '#888' : '#ccc' }]}>
                        <Image source={{ uri: ebook.cover_path }} style={styles.cover} />
                        <View style={styles.details}>
                            <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>{ebook.title}</Text>
                            <Text style={[styles.description, { color: theme === 'dark' ? '#ddd' : '#555' }]}>{ebook.description}</Text>
                            <Text style={[styles.date, { color: theme === 'dark' ? '#aaa' : '#888' }]}>{ebook.created_at}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
        borderRadius: 10,
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
