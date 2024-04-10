import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ThemeContext from '../contexts/ThemeProvider';
import Sidebar from '../components/Layout/Sidebar';
import TopNav from '../components/Layout/TopNav';
import CategoryCard from '../components/SearchComponents/CategoryCard';
import SearchBar from '../components/SearchComponents/SearchBar';


const data = [
  {
    name: "Podcasts",
    subcategories: [
      "True Crime",
      "Comedy",
      "Technology",
      "Business",
      "Health & Wellness",
    ]
  },
  {
    name: "Movies",
    subcategories: [
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Science Fiction",
    ]
  },
  {
    name: "TV Shows",
    subcategories: [
      "Drama Series",
      "Comedy Series",
      "Reality TV",
      "Documentaries",
      "Crime & Mystery",
    ]
  },
  {
    name: "Music",
    subcategories: [
      "Pop",
      "Rock",
      "Hip Hop",
      "Electronic",
      "Jazz",
    ]
  },
  {
    name: "Books",
    subcategories: [
      "Fiction",
      "Non-fiction",
      "Mystery & Thriller",
      "Fantasy",
      "Biography",
    ]
  },
  {
    name: "Games",
    subcategories: [
      "Action",
      "Adventure",
      "Role-playing",
      "Strategy",
      "Simulation",
    ]
  },
  {
    name: "Comics",
    subcategories: [
      "Superheroes",
      "Manga",
      "Graphic Novels",
      "Webcomics",
      "Slice of Life",
    ]
  },
  {
    name: "Sports",
    subcategories: [
      "Football",
      "Basketball",
      "Soccer",
      "Tennis",
      "Golf",
    ]
  },
  {
    name: "Cooking",
    subcategories: [
      "Recipes",
      "Healthy Eating",
      "Baking",
      "International Cuisine",
      "Quick & Easy Meals",
    ]
  },
  {
    name: "Travel",
    subcategories: [
      "Adventure Travel",
      "Cultural Exploration",
      "Food Tourism",
      "Eco-Tourism",
      "Luxury Travel",
    ]
  }
];

export default function Search() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <View style={[styles.scrollView, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <TopNav heading={"Explore"} toggleSidebar={toggleSidebar} />
      <View style={styles.container}>
        <SearchBar />
        <ScrollView style={styles.scrollCont} >
          <View style={styles.categoryCont} >
            {
              data.map((data) => <CategoryCard key={data.name} data={data} />)
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    paddingBottom: 20,
  },
  scrollCont: {
    marginBottom: 50,
    marginTop: 10
  },
  categoryCont: {
    paddingHorizontal: 10,
  },
});