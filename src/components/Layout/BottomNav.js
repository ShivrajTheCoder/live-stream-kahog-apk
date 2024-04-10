import React, { useContext } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ThemeContext from '../../contexts/ThemeProvider';
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome5"
export default function BottomNav({ state,  navigation }) {
    const iconRoutes = {
        home: "Home",
        search: "Search",
        creator: "Creator",
        calendar: "Calendar",
        about: "AboutUs",
      };
    const { theme } = useContext(ThemeContext);
    console.log(theme);
    const icons = [
        <Icon name="home" size={30}  />,
        <Icon name="magnifying-glass" size={30}  />,
        <Icon name="squared-plus" size={30}  />,
        <Icon name="calendar" size={30}  />,
        <Icon2 name="kickstarter-k" size={30}  />,
        
    ];
    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate(iconRoutes[Object.keys(iconRoutes)[index]]);
          }}
          style={[styles.tabButton, state.index === index && styles.tabButtonFocused]}
        >
          {React.cloneElement(icon, {
            color: theme === 'dark' ? 'white' : 'black'
          })}
        </TouchableOpacity>
      ))}
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: Dimensions.get('window').width,
      paddingVertical:7
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    },
    tabButtonFocused: {
      // Add styles for focused tab if needed
    }
  });