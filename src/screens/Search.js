import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios';
import ThemeContext from '../contexts/ThemeProvider';
import Sidebar from '../components/Layout/Sidebar';
import TopNav from '../components/Layout/TopNav';
import CategoryCard from '../components/SearchComponents/CategoryCard';
import SearchBar from '../components/SearchComponents/SearchBar';
import KeyCenter from '../KeyCenter';

export default function Search() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const apiUrl = KeyCenter.apiUrl;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/category/getallcategories`);
        if (response.status === 200) {
          setCategories(response.data.categories);
        } else {
          setError('Failed to fetch categories');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={[styles.scrollView, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <TopNav heading={"Explore Top Podcasts"} toggleSidebar={toggleSidebar} />
      <View style={styles.container}>
        <SearchBar />
        <ScrollView style={styles.scrollCont} >
          <View style={styles.categoryCont} >
            {
              categories.map((data) => <CategoryCard key={data.name} data={data} />)
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
