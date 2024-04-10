import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SongTile from './Tiles';
import ThemeContext from '../../contexts/ThemeProvider';


const data = [
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575264/kj%20images/episodes-6_tusovr.jpg",
    id: 1,
  },
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575264/kj%20images/episodes-4_fo1yx6.jpg",
    id: 2,
  },
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575264/kj%20images/episodes-5_vhawaz.jpg",
    id: 3,
  },
  {
    image: "https://res.cloudinary.com/dushmacr8/image/upload/v1707575266/kj%20images/episodes-2_attb17.jpg",
    id: 4,
  },
];

export default function ListenWithContainer() {
  const { theme } = useContext(ThemeContext); // Access theme from ThemeContext
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState();
//   const [content, setContent] = useState([]);
//   useEffect(() => {
//     setError(null);
//     const fetchTopOriginals = async () => {
//         try {
//             const response = await axios.get(`api-to-fetch-top-originals`);
//             if (response.status === 200) {
//               setContent(response.data.toporiginals);
//             } else {
//                 console.error('Failed to fetch top lives:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error fetching top lives:', error);
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     }
//     fetchTopOriginals();
// }, []);
  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Listen with Kaho G</Text>
      <ScrollView horizontal={true} style={styles.tileScroll} showsHorizontalScrollIndicator={false}>
        <View style={styles.tileCont}>
          {
            data.map(item => {
              return (
                <SongTile key={item.id} item={item} />
              );
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tileScroll: {
    marginTop: 10,
    marginBottom: 10,
  },
  tileCont: {
    display: "flex",
    flexDirection: "row",
  },
});
