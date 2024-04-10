import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import CommunityTile from '../../components/HomeComponents/SliderComponents/CommunityTile';

export default function Community() {
    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme === 'dark' ? 'white' : 'black' }]}>Your Communities</Text>
                <View style={styles.communityContainer}>
                    {/* Your communities tiles go here */}
                    <CommunityTile />
                    <CommunityTile />
                    {/* Add more CommunityTile components as needed */}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme === 'dark' ? 'white' : 'black' }]}>Communities to Join</Text>
                <View style={styles.communityContainer}>
                    {/* Communities to join tiles go here */}
                    <CommunityTile />
                    <CommunityTile />
                    {/* Add more CommunityTile components as needed */}
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
