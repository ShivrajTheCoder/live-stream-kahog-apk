import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.inputContainer}>
                <Image
                        style={styles.setting}
                        source={{
                            uri: "https://res.cloudinary.com/dushmacr8/image/upload/v1709704260/kj%20images/icons/searh-black_nmc4zb.png"
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Podcasts,shows..."
                        placeholderTextColor="#999"
                    />
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical:10
    },
    image: {
        height: 80,
        width: 80,
        margin:20
    },
    setting: {
        height: 30,
        width: 30,
        marginHorizontal:10
    },
    topBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1 ,// Added flex: 1 to inputContainer to allow it to take remaining space
        backgroundColor:"#f5f3f4",
        borderRadius: 5,
    },
    input: {
        // borderWidth: 1,
        // borderColor: "#999",
        
        paddingHorizontal: 6,
        height: 40,
        flex: 1, // Added flex: 1 to input to allow it to take remaining space
        marginRight: 10,
        backgroundColor:"#f5f3f4"
    }
});
