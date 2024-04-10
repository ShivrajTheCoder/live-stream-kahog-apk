import React from 'react';
import { Text, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icons from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native';

const share = <Icons name="sharealt" size={24} color="black" />;

export default function BhajanTile({ item }) {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.liveInfo}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.details}>
          <Text style={[styles.name, styles.bold]}>Satish Thakral</Text>
          <Text style={styles.name}>Course Name</Text>
        </View>
        <TouchableOpacity style={styles.shareIcon}>
          {share}
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Heading of the video</Text>
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("AudioPlay") }} >
        <Text style={styles.buttonText}>Listen Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 10,
    backgroundColor: '#0077b6',
    borderRadius: 10,
    width: 250, // Adjust the width as needed
  },
  liveInfo: {
    flexDirection: 'row',
    // padding: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  details: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    color:"white",
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    color:"white",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    color:"white",
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 2,
    marginHorizontal: 10,
  },
  shareIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
