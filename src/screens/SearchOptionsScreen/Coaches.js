import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LiveContainer from '../../components/HomeComponents/LiveContainer';
import ThemeContext from '../../contexts/ThemeProvider';
import BackButton from '../../components/BackButton';


export default function Coaches() {
    const { theme } = useContext(ThemeContext);

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <BackButton screen='Coaches' to='Home' />
            <Text style={[styles.heading, { color: theme === 'dark' ? 'white' : 'black' }]}>Connect with our coaches </Text>
            <View style={styles.coachContainer}>
                <View style={styles.coachInfo}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1709833529/kj%20images/profile_n5q8mg.png" }}
                        style={styles.coachImage}
                    />
                    <Text style={[styles.coachName, { color: theme === 'dark' ? 'white' : 'black' }]}>Name</Text>
                </View>
                <LiveContainer live={false} />
            </View>
            <View style={styles.coachContainer}>
                <View style={styles.coachInfo}>
                    <Image
                        source={{ uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1709833529/kj%20images/profile_n5q8mg.png" }}
                        style={styles.coachImage}
                    />
                    <Text style={[styles.coachName, { color: theme === 'dark' ? 'white' : 'black' }]}>Name</Text>
                </View>
                <LiveContainer live={false} />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    coachContainer: {
        
    },
    coachInfo: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    coachImage: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    coachName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 17,
        fontWeight: "bold",
        margin: 10
    }
});
