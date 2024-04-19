import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import ChannelContainer from '../../components/HomeComponents/ChannelContainer';

export default function AllChannels() {
    const { theme } = useContext(ThemeContext);
    const apiUrl = KeyCenter.apiUrl;
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        const fetchInterests = async () => {
            try {
                const response = await axios.get(`${apiUrl}/interests/getallinterests`);
                if (response.status === 200) {
                    const { interests } = response.data;
                    setInterests(interests);
                } else {
                    console.error('Failed to fetch interests:', response.statusText);
                    setError('Failed to fetch interests');
                }
            } catch (error) {
                console.error('Error fetching interests:', error);
                setError('Error fetching interests');
            } finally {
                setLoading(false);
            }
        };

        fetchInterests();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <ScrollView style={styles.channelSectionsContainer} showsVerticalScrollIndicator={false}>
                {interests.map((interest, index) => (
                    <ChannelContainer interest={interest} key={index} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    channelSectionsContainer: {
        flex: 1,
        paddingVertical: 10,
    },
});
