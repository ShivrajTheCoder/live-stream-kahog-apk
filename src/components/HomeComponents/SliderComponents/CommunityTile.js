import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import ThemeContext from '../../../contexts/ThemeProvider';


export default function CommunityTile() {
    const { theme } = useContext(ThemeContext);

    // Placeholder initial (use "A" for now)
    const initial = "A";
    const name = "Arts and Music";
    const members = "1000";

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff' }]}>
            <View style={styles.initialContainer}>
                <Text style={[styles.initial, { color: theme === 'dark' ? '#ffffff' : '#666' }]}>{initial}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.name, { color: theme === 'dark' ? '#ffffff' : 'black' }]}>{name}</Text>
                <Text style={[styles.members, { color: theme === 'dark' ? '#ffffff' : 'gray' }]}>{members} members</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    initialContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    initial: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    members: {
        fontSize: 14,
    },
    joinButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
