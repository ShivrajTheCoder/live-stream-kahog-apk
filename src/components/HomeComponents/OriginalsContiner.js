import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../contexts/ThemeProvider';

export default function OriginalsContainer({ setShowComp }) {
  const navigation = useNavigation();
  // Sample data for Originals
  const originals = [
    { category: 'Podcasts', backgroundColor: '#ff6347', page: "Search" },
    { category: 'Events', backgroundColor: '#4682b4', page: "Events" },
    { category: 'E-books', backgroundColor: '#2e8b57', page: "E-books" },
    { category: 'Audiobooks', backgroundColor: '#f4a460', page: "AudioBooks" },
    { category: 'Channels', backgroundColor: '#9370db', page: "Channels" },
    { category: 'Circles', backgroundColor: '#ffa500', page: "Circles" },
    { category: 'Pathshala', backgroundColor: '#ff6347', page: "Pathshala" },
    { category: 'Karyashala', backgroundColor: '#4682b4', page: "Karyashala" },
  ];

  const { theme } = useContext(ThemeContext); // Access theme from ThemeContext

  const handleTilePress = (page, category) => {
    if (category === 'E-books' || category === 'Audiobooks' || category === 'Channels' || category === 'Circles') {
      // Set showComp to the page
      setShowComp(page);
    } else {
      // Navigate to the specified page
      navigation.navigate(page);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Kaho G Originals & Events</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
        {originals.map((original, index) => (
          <TouchableOpacity key={index} onPress={() => handleTilePress(original.page, original.category)}>
            <View style={[styles.block, { backgroundColor: original.backgroundColor }]}>
              <Text style={styles.text}>{original.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  block: {
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
