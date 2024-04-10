import React, { useContext } from 'react';
import { Image, StyleSheet, View, ScrollView, Text } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';


const data = [
    {
        name: "Anuj",
        id: 1,
    },
    {
        name: "Shivraj",
        id: 2,
    },
    {
        name: "Riya",
        id: 3
    }
];

export default function ProfileContainer({ fooLive }) {
    const { theme } = useContext(ThemeContext); // Access theme from ThemeContext

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            {
                !fooLive &&
                <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Profiles</Text>
            }
            <ScrollView horizontal={true}>
                {
                    data.map(profile => {
                        return (
                            <View key={profile.id} style={styles.profile}>
                                <Image style={styles.pic} source={{ uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1709833529/kj%20images/profile_n5q8mg.png" }} />
                                <Text style={[styles.name, { color: theme === 'dark' ? 'white' : 'black' }]}>{profile.name}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    pic: {
        height: 70,
        width: 70,
        borderRadius: 50
    },
    profile: {
        marginHorizontal: 7,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    heading: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5
    },
    name: {
        fontSize: 14,
        marginTop: 5
    }
});
