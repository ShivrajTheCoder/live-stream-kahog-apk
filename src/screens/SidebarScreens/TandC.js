import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  Ionicons  from "react-native-vector-icons/Ionicons";
import ThemeContext from '../../contexts/ThemeProvider';



export default function TandC({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const handleBack = () => {
    navigation.goBack();
  };

  const backIconColor = theme === 'dark' ? 'white' : 'black';

  const backIcon = <Ionicons name="arrow-back" size={24} color={backIconColor} />;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    headingText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
      color: theme === 'dark' ? 'white' : 'black',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 20,
    },
    content: {
      alignItems: 'center',
    },
    subTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 20,
      color: theme === 'dark' ? 'white' : 'black',
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 15,
      textAlign: 'justify',
      color: theme === 'dark' ? 'white' : 'black',
    },
  });

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          {backIcon}
        </TouchableOpacity>
        <Text style={styles.headingText}>Terms & Conditions</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.paragraph}>
          Welcome to KahoJi, a media streaming and social grouping app! These Terms and Conditions outline the rules and regulations for the use of our app.
        </Text>
        <Text style={styles.subTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using the KahoJi app, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the app.
        </Text>
        <Text style={styles.subTitle}>2. User Accounts</Text>
        <Text style={styles.paragraph}>
          You must be at least 13 years old to use the KahoJi app. If you are under the age of 18, you must have permission from your parent or legal guardian.
        </Text>
        <Text style={styles.subTitle}>3. Content</Text>
        <Text style={styles.paragraph}>
          Users are solely responsible for the content they post on the KahoJi app. Any inappropriate content, including but not limited to, hate speech, nudity, or violence, will be removed, and users may be banned from the app.
        </Text>
        <Text style={styles.subTitle}>4. Media Streaming</Text>
        <Text style={styles.paragraph}>
          KahoJi provides media streaming services for its users. Users may only stream content that they have the right to share. Any violation of copyright laws will result in the removal of the content and possible account suspension.
        </Text>
        {/* Add more terms and conditions as needed */}
      </ScrollView>
    </View>
  );
}
