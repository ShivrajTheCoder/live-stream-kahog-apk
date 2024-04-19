import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import ThemeContext from '../../contexts/ThemeProvider';
import CommunityTile from '../../components/HomeComponents/SliderComponents/CommunityTile';
import KeyCenter from '../../KeyCenter';

export default function Community() {
    const { theme } = useContext(ThemeContext);
    const apiUrl = KeyCenter.apiUrl;
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await axios.get(`${apiUrl}/communities/getallcommunities`);
                // console.log(response.data, "here are the communities");
                if (response.status === 200) {
                    setCommunities(response.data.communities);
                } else {
                    console.error('Failed to fetch communities:', response.statusText);
                    setError('Failed to fetch communities');
                }
            } catch (error) {
                console.error('Error fetching communities:', error);
                setError('Error fetching communities');
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme === 'dark' ? 'white' : 'black' }]}>All Communities</Text>
                <View style={styles.communityContainer}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : error ? (
                        <Text>Error: {error}</Text>
                    ) : communities.length === 0 ? (
                        <Text>No communities found.</Text>
                    ) : (
                        communities.map(community => (
                            <CommunityTile key={community.id} community={community} />
                        ))
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    communityContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
