import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function BannerSlider() {
    // Generate dummy data for banners
    const dummyData = [
        { id: 1, text: 'Banner 1', color: getRandomColor() },
        { id: 2, text: 'Banner 2', color: getRandomColor() },
        { id: 3, text: 'Banner 3', color: getRandomColor() },
    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyData.map((banner) => (
                <View key={banner.id} style={[styles.banner, { backgroundColor: banner.color }]}>
                    <Text style={styles.bannerText}>{banner.text}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

// Function to generate random hex color codes
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const styles = StyleSheet.create({
    banner: {
        width: 200,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    bannerText: {
        color: 'white',
        fontSize: 18,
    },
});
