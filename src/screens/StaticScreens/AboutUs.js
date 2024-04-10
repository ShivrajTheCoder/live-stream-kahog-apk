import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';
import BackButton from '../../components/BackButton';


export default function AboutUs() {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme === 'dark' ? 'white' : 'black',
    },
    subHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 5,
      color: theme === 'dark' ? 'white' : 'black',
    },
    text: {
      fontSize: 16,
      marginBottom: 10,
      color: theme === 'dark' ? 'white' : 'black',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      color: theme === 'dark' ? 'white' : 'black',
    },
    bullet: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme === 'dark' ? 'white' : 'black',
      marginRight: 5,
    },
  });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>About Us</Text> */}
      <BackButton screen='AboutUs' />
      <Text style={styles.text}>
        KahoG is a leading media streaming platform that offers a wide range of content including audio, video, podcasts, and ebooks. 
        Our mission is to provide users with high-quality entertainment and educational content at their fingertips.
      </Text>
      <Text style={styles.subHeading}>Our Services:</Text>
      <View style={styles.listItem}>
        <View style={styles.bullet}></View>
        <Text style={styles.text}>Streaming of audios and videos</Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.bullet}></View>
        <Text style={styles.text}>Premium podcasts</Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.bullet}></View>
        <Text style={styles.text}>Sales of ebooks, books, and audiobooks</Text>
      </View>
      <Text style={styles.subHeading}>Contact Us:</Text>
      <Text style={styles.text}>
        For any inquiries or feedback, feel free to reach out to us at support@kahog.com.
      </Text>
    </View>
  );
}
