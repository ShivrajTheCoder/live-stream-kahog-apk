import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated, Easing } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import BackButton from '../components/BackButton';
import ThemeContext from '../contexts/ThemeProvider';
import Sidebar from '../components/Layout/Sidebar';
import HomeNav from '../components/HomeComponents/HomeNav';
import CategoriesSlider from '../components/DetailsComponents/CategoriesSlider';
import All from './SliderScreens/All';
import AllChannels from './SliderScreens/AllChannels';
import Podcasts from './Podcasts';
import AudioBooks from './SliderScreens/AudioBooks';
import Circles from './SliderScreens/Circles';
import Community from './SliderScreens/Community';
import Ebooks from './SliderScreens/Ebooks';


export default function Home() {

  const { theme } = useContext(ThemeContext);
  const [showSplash, setShowSplash] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showComp, setShowComp] = useState('All');
  const splashSize = new Animated.Value(200);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(splashSize, {
          toValue: 250,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(splashSize, {
          toValue: 200,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      splashSize.stopAnimation();
    };
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategoryChange = (category) => {
    setShowComp(category);
  };
  return (
    <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
      {showSplash ? (
        <View style={styles.splashCont}>
          <Animated.Image
            style={[styles.splashImg, { width: splashSize, height: splashSize }]}
            source={{
              uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1710155799/kj%20images/kahojilogo-modified_ft0kex.png"
            }}
          />
          <Text style={[styles.splashText, { color: theme === 'light' ? 'black' : 'white' }]}>Kaho G</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
          <HomeNav toggleSidebar={toggleSidebar} />
          <CategoriesSlider changeCategory={handleCategoryChange} selectedComp={showComp} />
          {showComp === 'All' && <All setShowComp={setShowComp} />}
          {showComp === 'Channels' && <AllChannels />}
          {showComp === 'Podcasts' && <Podcasts />}
          {showComp === 'E-books' && <Ebooks />}
          {showComp === 'Communities' && <Community />}
          {showComp === 'Audiobooks' && <AudioBooks />}
          {showComp === 'Circles' && <Circles />}
        </View>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    paddingBottom: 20,
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  splashCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  splashImg: {
    resizeMode: 'contain',
  },
});
