import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ThemeContext from '../../contexts/ThemeProvider';



export default function TopNav({ heading, toggleSidebar }) {
    const userInitial = 'M';
    const { theme } = useContext(ThemeContext);

    const handleProfilePress = () => {
        toggleSidebar(); // Toggle sidebar on click of profile initial
    };

    const iconColor = theme === 'dark' ? 'white' : 'black';

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
            <TouchableOpacity onPress={handleProfilePress}>
                <View style={styles.leftContainer}>
                    <View style={styles.userInitial}>
                        <Text style={[styles.initialText, { color: iconColor }]}>{userInitial}</Text>
                    </View>
                    {/* <View style={styles.coinsContainer}>
                        <Text style={[styles.coinsCount, { color: iconColor }]}>{coinsCount}</Text>
                        <FontAwesome5 name="coins" size={24} color={iconColor} />
                    </View> */}
                </View>
            </TouchableOpacity>
            <Text style={[styles.title, { color: iconColor }]}>{heading}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInitial: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1c4966',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    initialText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinsCount: {
        marginRight: 5,
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 30
    },
});
