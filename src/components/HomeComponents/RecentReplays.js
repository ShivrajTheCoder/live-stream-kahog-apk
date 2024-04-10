import React, { useContext, useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import  Entypo from 'react-native-vector-icons/Entypo';
import  Feather  from 'react-native-vector-icons/Feather';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../contexts/ThemeProvider';

export default function RecentReplays() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); // Access theme from ThemeContext
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [audios, setAudios] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get(`${apiUrl}/others/gettopaudios`);
        const response = {
          status:200,
          data:{
            audios:[
                {
                  name:"sldfj",
                  date:"dlfsd",
                  time:"dslfjs"
                }
            
            ]}
        };
        if (response.status === 200) {
          console.log(response.data.audios)
          //   setBanner(image);
          setAudios(response.data.audios)
        } else {
          console.error('Failed to fetch products:', response.statusText);
          setError("Error while fetching")
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // Define icons based on the current theme
  const playIcon = theme === 'dark' ? (
    <Entypo name="controller-play" size={20} color="white" />
  ) : (
    <Entypo name="controller-play" size={20} color="black" />
  );

  const dotsIcon = theme === 'dark' ? (
    <Entypo name="dots-three-vertical" size={20} color="white" />
  ) : (
    <Entypo name="dots-three-vertical" size={20} color="black" />
  );

  const headphoneIcon = theme === 'dark' ? (
    <Feather name="headphones" size={20} color="white" />
  ) : (
    <Feather name="headphones" size={20} color="black" />
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, theme === 'dark' && styles.darkHeading]}>Most Played</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <View style={styles.audioListsContainer}>
          <View style={styles.audioListWrapper}>
            <View style={styles.audioList}>
              <TouchableOpacity onPress={() => navigation.navigate('AudioPlay')} style={styles.audioItem}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.audioName, theme === 'dark' && styles.darkText]}>Audio 1</Text>
                  <View style={styles.additionalInfo}>
                    {headphoneIcon}
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>10-12 MAR 2024</Text>
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>11:30 AM</Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  {playIcon}
                  {dotsIcon}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AudioPlay')} style={styles.audioItem}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.audioName, theme === 'dark' && styles.darkText]}>Audio 1</Text>
                  <View style={styles.additionalInfo}>
                    {headphoneIcon}
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>10-12 MAR 2024</Text>
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>11:30 AM</Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  {playIcon}
                  {dotsIcon}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AudioPlay')} style={styles.audioItem}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.audioName, theme === 'dark' && styles.darkText]}>Audio 1</Text>
                  <View style={styles.additionalInfo}>
                    {headphoneIcon}
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>10-12 MAR 2024</Text>
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>11:30 AM</Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  {playIcon}
                  {dotsIcon}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AudioPlay')} style={styles.audioItem}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.audioName, theme === 'dark' && styles.darkText]}>Audio 1</Text>
                  <View style={styles.additionalInfo}>
                    {headphoneIcon}
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>10-12 MAR 2024</Text>
                    <Text style={[styles.date, theme === 'dark' && styles.darkText]}>11:30 AM</Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  {playIcon}
                  {dotsIcon}
                </View>
              </TouchableOpacity>
              {/* Add more audio items as needed */}
            </View>
          </View>
          {/* Add more audio lists as needed */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkHeading: {
    color: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  audioListsContainer: {
    flexDirection: 'row',
  },
  audioListWrapper: {
    marginRight: 10, // Adjust spacing between lists
  },
  audioList: {
    flexDirection: 'column',
  },
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: 200, // Adjust as needed
    marginBottom: 10,
  },
  audioName: {
    fontSize: 16,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  darkText: {
    color: 'white', // White text color for dark mode
  },
  infoContainer: {
    flexDirection: 'column',
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  date: {
    fontSize: 12,
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
  },
});
