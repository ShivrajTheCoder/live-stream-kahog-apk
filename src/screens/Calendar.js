import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ThemeContext from '../contexts/ThemeProvider';
import Sidebar from '../components/Layout/Sidebar';
import TopNav from '../components/Layout/TopNav';


export default function Calendar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useContext(ThemeContext); // Access the current theme

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ScrollView contentContainerStyle={styles[theme].scrollView}>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <View style={styles[theme].container}>
        <TopNav heading={"Calendar"} toggleSidebar={toggleSidebar} />
      </View>
      <View style={styles[theme].contentCont}>
        <Text style={styles[theme].day}>Monday</Text>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <View style={styles[theme].content}>
          <View style={styles[theme].timeCont}>
            <Text style={styles[theme].time}>16:30</Text>
          </View>
          <View style={styles[theme].titleCont}>
            <Text style={styles[theme].title}>
              To know about TOASTING
            </Text>
            <Text style={styles[theme].name}>
              Coach name
            </Text>
          </View>
          <TouchableOpacity style={styles[theme].button}>
            <Text style={styles[theme].buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        {/* Repeat content for other days */}
      </View>
    </ScrollView>
  );
}

const styles = {
  light: StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      backgroundColor: "white",
    },
    container: {
      paddingBottom: 20,
    },
    day: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 10
    },
    contentCont: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      color: "black",
    },
    name: {
      fontSize: 14,
      color: "black",
    },
    time: {
      fontSize: 16,
      color: "black",
    },
    timeCont: {
      backgroundColor: "#0077b6",
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 4
    },
    button: {
      backgroundColor: "#ced4da",
      padding: 10,
      borderRadius: 10,
      margin: 10,
    },
    buttonText: {
      color: "black",
    },
    titleCont: {
      paddingHorizontal: 10,
      borderRadius: 10
    }
  }),
  dark: StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      backgroundColor: "black",
    },
    container: {
      paddingBottom: 20,
    },
    day: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 10
    },
    contentCont: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      color: "white",
    },
    name: {
      fontSize: 14,
      color: "white",
    },
    time: {
      fontSize: 16,
      color: "white",
    },
    timeCont: {
      backgroundColor: "#333",
      padding: 10,
      borderRadius: 10,
      marginHorizontal: 4
    },
    button: {
      backgroundColor: "#ced4da",
      padding: 10,
      borderRadius: 10,
      margin: 10,
    },
    buttonText: {
      color: "black",
    },
    titleCont: {
      paddingHorizontal: 10,
      borderRadius: 10
    }
  })
};
