import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

export default function TileContainer() {
  // Sample data of images
  const images = [
    { id: 1, uri: 'https://res.cloudinary.com/dushmacr8/image/upload/v1707575262/kj%20images/audiocover2_pmjzej.jpg', height: 200 },
    { id: 2, uri: 'https://res.cloudinary.com/dushmacr8/image/upload/v1707575264/kj%20images/audiocover3_oxgkjv.jpg', height: 150 },
    { id: 3, uri: 'https://res.cloudinary.com/dushmacr8/image/upload/v1707575262/kj%20images/audio1_owdar0.jpg', height: 250 },
    { id: 4, uri: 'https://res.cloudinary.com/dushmacr8/image/upload/v1707575264/kj%20images/episodes-4_fo1yx6.jpg', height: 180 },
    // Add more images as needed
  ];

  // Divide the images into odd and even items
  const oddImages = images.filter((item, index) => index % 2 === 0);
  const evenImages = images.filter((item, index) => index % 2 === 1);

  // Render each image item
  const renderItem = ({ item }) => (
    <Image
      style={[styles.image, { height: item.height }]}
      source={{ uri: item.uri }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={oddImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginRight: 5 }} // Add margin to the right for odd images
      />
      <FlatList
        data={evenImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginLeft: 5 }} // Add margin to the left for even images
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", // Center the items horizontally
  },
  image: {
    width: '48%', // Set the width to fit two images per row with some spacing
    marginBottom: 10, // Add some margin at the bottom for spacing
    aspectRatio: 1, // Maintain aspect ratio
    resizeMode: 'cover', // Cover mode
  },
});
