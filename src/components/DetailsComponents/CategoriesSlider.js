import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';


const data = [
  {
    name: "All",
    id: 1,
  },
  {
    name: "Podcasts",
    id: 2,
  },
  {
    name: "Channels",
    id: 3,
  },
  {
    name: "E-books",
    id: 4,
  },
  {
    name: "Audiobooks",
    id: 6,
  },
  {
    name: "Communities",
    id: 5,
  },
  {
    name: "Circles",
    id: 7,
  },
];

export default function CategoriesSlider({ changeCategory, selectedComp }) {
  const { theme } = useContext(ThemeContext);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryTile,
              selectedComp === item.name ? styles.selectedCategoryTile : null,
              theme === 'dark' ? styles.darkBackground : null
            ]}
            onPress={() => changeCategory(item.name)}
          >
            <Text style={[
              styles.name,
              selectedComp === item.name ? styles.selectedName : null,
              theme === 'dark' ? styles.darkText : null
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  categoryTile: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor:"black",
  },
  selectedCategoryTile: {
    // Additional styles for the selected category can be added here
    backgroundColor:"gray",
  },
  name: {
    // Additional styles for the category name can be added here
    color:"white"
  },
  selectedName: {
    color:"white",
    // Additional styles for the selected category name can be added here
  },
  darkBackground: {
    backgroundColor: 'white', // White background for dark theme
  },
  darkText: {
    color: 'black', // Black text for dark theme
  },
});
