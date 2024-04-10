import React from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import  AntDesign  from 'react-native-vector-icons/AntDesign';

const share = <AntDesign name="sharealt" size={24} color="black" />;

export default function CircleTile({circle}) {
  // console.log(circle);
  return (
    <View style={styles.container}>
      <View style={styles.circleInfo}>
        <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/70' }} />
        <View style={styles.details}>
          <Text style={[styles.name, styles.bold]}>{circle.circle_name}</Text>
          <Text style={styles.name}>Circle Description</Text>
        </View>
        <TouchableOpacity style={styles.shareIcon}>
          {share}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Join Circle</Text>
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
    alignItems: 'flex-start', // Align items to the start of the cross axis (vertically)
    marginBottom: 20, // Add some margin at the bottom for separation
  },
  circleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35, // Make the image circular
  },
  details: {
    marginLeft: 10,
    flex: 1, // Take remaining space
  },
  name: {
    color: 'white',
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
    width: '100%', // Make the button take the full width
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shareIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
