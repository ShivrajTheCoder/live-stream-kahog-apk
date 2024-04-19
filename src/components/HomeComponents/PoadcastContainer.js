import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';

export default function PodcastContainer({ setSelCat }) {
  const navigation = useNavigation();
  const apiUrl = KeyCenter.apiUrl;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/category/getallcategories`);
        if (response.status === 200) {
          setCategories(response.data.categories);
        } else {
          setError('Failed to fetch categories');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF7A', '#337AFF', '#FF33E9', '#FFE933', '#33FFF3']; // Array of available colors
    let randomIndex = Math.floor(Math.random() * colors.length); // Generate a random index
    return colors[randomIndex]; // Return the color at the random index
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Podcasts</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.block, { backgroundColor: getRandomColor() }]} // Set random background color
            onPress={() => {
              if (setSelCat) {
                setSelCat({
                  selId: category.id,
                  name: category.category_name
                });
              } else {
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
    marginTop: 10,
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
