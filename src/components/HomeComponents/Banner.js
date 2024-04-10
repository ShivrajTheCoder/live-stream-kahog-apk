import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ImageBackground } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function Banner() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [banner, setBanner] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        // const response = await axios.get(`${apiUrl}/others/getbanner`);
        const response = {
          status:200,
          data:{
            banner:[{
              image_url:"https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_1280.jpg"
            }]
          }
          
        };
        if (response.status === 200) {
          const { banner } = response.data;
          const image = banner[0].image_url;
          setBanner(image);
        } else {
          console.error('Failed to fetch banner:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <ImageBackground
          source={{ uri:  'https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_1280.jpg' }}
          style={[styles.container, { height: windowHeight * 0.2 }]}
        >
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
