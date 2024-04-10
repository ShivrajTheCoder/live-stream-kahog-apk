import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';

import axios from 'axios';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import ChannelContainer from '../../components/HomeComponents/ChannelContainer';


const backIcon = <Ionicons name="arrow-back" size={24} color="black" />;

// Sample data for channels
const channelsData = [
    { title: 'Speak English', channels: ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4'] },
    { title: 'Another Title', channels: ['Channel 5', 'Channel 6', 'Channel 7', 'Channel 8'] },
    { title: 'Another Title', channels: ['Channel 5', 'Channel 6', 'Channel 7', 'Channel 8'] },
    { title: 'Another Title', channels: ['Channel 5', 'Channel 6', 'Channel 7', 'Channel 8'] },
    // Add more titles and channels as needed
];

export default function AllChannels({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const apiUrl = KeyCenter.apiUrl;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiUrl}/category/getallcategories`);
                if (response.status === 200) {
                    const { categories } = response.data;
                    console.log(categories);
                    setCategories(categories);
                } else {
                    console.error('Failed to fetch categories:', response.statusText);
                    setError('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Error fetching categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    const handleBack = () => {
        navigation.goBack();    // Handle back button press
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            {/* <Text>Hi</Text> */}
            <ScrollView style={styles.channelSectionsContainer} showsVerticalScrollIndicator={false}>
                {categories.map((category, index) => (
                    <ChannelContainer category={category} key={index} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    backButton: {
        marginRight: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    channelSectionsContainer: {
        flex: 1,
        paddingVertical: 10,
    },
    channelSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    channelCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginHorizontal: 10,
        flexDirection: "row",
        marginBottom: 10,
    },
    image: {
        height: 100,
        width: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    channelInfo: {
        backgroundColor: 'orange',
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1,
    },
    channelTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    coachName: {
        color: 'white',
        fontSize: 13
    },
    date: {
        color: 'white',
        fontSize: 10
    },
});
