import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../contexts/ThemeProvider';

export default function BackButton({ screen = "Home", to = "Home" }) {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const handlePress = () => {
    navigation.navigate(to);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'transparent' }]}>
      <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} style={styles.icon} />
      <Text style={[styles.screenName, { color: theme === 'dark' ? 'white' : 'black' }]}>{screen}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  screenName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
