import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';



export default function PodcastContainer({ setSelCat }) {
  const navigation = useNavigation(); // Initialize navigation

  const apiUrl = KeyCenter.apiUrl;
  const [categories, setCategories] = useState([
    {
      "id": 1,
      "category_name": "Cinema",
      "backgroundColor": '#ff6347'
    },
    {
      "id": 2,
      "category_name": "Sangeet",
      "backgroundColor": '#4682b4'
    },
    {
      "id": 3,
      "category_name": "Sahitya",
      "backgroundColor": '#ffa500'
    },
    {
      "id": 4,
      "category_name": "Shiksha",
      "backgroundColor": '#2e8b57'
    },
    {
      "id": 5,
      "category_name": "Social",
      "backgroundColor": '#1e90ff'
    },
    {
      "id": 6,
      "category_name": "Popular",
      "backgroundColor": '#ff1493'
    }
  ]);

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Podcasts</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.block, { backgroundColor: category.backgroundColor }]}
              onPress={() => {
                if (setSelCat) {
                  setSelCat({
                    selId: category.id,
                    name: category.category_name
                  });
                } else {
                  // Navigate to details page
                  navigation.navigate('Podcasts');
                }
              }}
            >
              <Text style={styles.text}>{category.category_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10
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
