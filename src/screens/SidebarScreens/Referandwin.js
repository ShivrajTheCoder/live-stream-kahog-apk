import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../../contexts/ThemeProvider';


export default function Referandwin({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleInvite = () => {
    // Implement functionality to invite via WhatsApp
  };

  const backIconColor = theme === 'dark' ? 'white' : 'black';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
      padding: 20,
    },
    headingContainer: {
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
    buttonContainer: {
      backgroundColor: theme === 'dark' ? 'white' : 'black',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: theme === 'dark' ? 'black' : 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={backIconColor} />
        </TouchableOpacity>
        <Text style={styles.headingText}>Refer & Win</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleInvite}>
        <Text style={styles.buttonText}>Invite via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}
