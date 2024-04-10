import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TopNav from '../components/Layout/TopNav';
import Sidebar from '../components/Layout/Sidebar';
import CategoriesSlider from '../components/DetailsComponents/CategoriesSlider';
import BhajanContainer from '../components/HomeComponents/UpcomingLiveContainer';
import MentorCard from '../components/MentorCard';
import RecentReplays from '../components/HomeComponents/RecentReplays';

export default function ForMe() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <View style={styles.container}>
        <TopNav heading={"My Kaho G"} toggleSidebar={toggleSidebar} />
        <CategoriesSlider />
        <BhajanContainer />
        <Text style={styles.heading}>People To Follow</Text>
        <ScrollView horizontal>
          <View style={styles.followCont}>
            <MentorCard />
            <MentorCard />
            <MentorCard />
            <MentorCard />
            <MentorCard />
            <MentorCard />
          </View>
        </ScrollView>
        <RecentReplays />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  container: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  followCont: {
    marginHorizontal: 10,
    flexDirection: "row",
  }
});
