import { Image, StyleSheet, Text, View } from "react-native";
import Entypo  from 'react-native-vector-icons/Entypo';
export default function MentorCard() {
    return (
        <View style={styles.mentorCard}>
            <Image style={styles.profileImg} source={{ uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1709833529/kj%20images/profile_n5q8mg.png" }} />
            <Text style={styles.name}>Name</Text>
            <Text style={styles.other}>Position</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="location-pin" size={24} color="white" />
                <Text style={styles.other}>Location</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    mentorCard: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
        width: 170,
        padding: 5,
        borderRadius: 20,
        margin: 10,
        paddingVertical: 10,
    },
    name: {
        color: "white",
        fontWeight: "bold",
        marginVertical: 5,
        fontSize: 15,
        marginBottom: 5,
    },
    other: {
        color: "#a3b18a",
    },
});