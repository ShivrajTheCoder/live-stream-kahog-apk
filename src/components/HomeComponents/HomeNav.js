import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icons2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../contexts/ThemeProvider';


export default function HomeNav({ toggleSidebar }) {
  const { theme } = useContext(ThemeContext); // Access theme from ThemeContext
  // console.log(theme, "fomr nav")
  const notification = theme === 'dark' ? 
    <Icons name="notifications-none" size={30} color="white" /> :
    <Icons name="notifications-none" size={30} color="black" />;

  const message = theme === 'dark' ? 
    <Icons2 name="message-flash-outline" size={27} color="white" /> :
    <Icons2 name="message-flash-outline" size={27} color="black" />;
  const userInitial = 'M'; // Assuming the user's first initial is 'M'
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
      <TouchableOpacity onPress={toggleSidebar}>
        <View style={styles.leftContainer}>
          <View style={styles.userInitial}>
            <Text style={styles.initialText}>{userInitial}</Text>
          </View>
          {/* <View style={styles.coinsContainer}>
            <Text style={styles.coinsCount}>{coinsCount}</Text>
            {coins}
          </View> */}
        </View>
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme === 'light' ? 'black' : 'white' }]}>Kaho G</Text>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} >
          {notification}
        </TouchableOpacity >
        <View style={styles.iconSpacer} />
        <TouchableOpacity onPress={() => navigation.navigate('Inbox')} >
          {message}
        </TouchableOpacity >
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1c4966',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initialText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinsCount: {
    marginRight: 5,
    color: 'black',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacer: {
    width: 10, // Adjust as needed
  },
});
