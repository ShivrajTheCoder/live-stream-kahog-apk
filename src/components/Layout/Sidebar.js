import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../contexts/ThemeProvider';

export default function Sidebar({ open, onClose }) {
    if (!open) return null;
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext); // Accessing theme from the context

    const handleContentPress = () => {
        // Handle content specific actions here (e.g., navigation)
    };

    // Determine icon colors based on the theme
    const iconColor = theme === 'dark' ? 'white' : 'black';
    const backgroundColor = theme === 'dark' ? '#1c4966' : 'white';
    const textColor = theme === 'dark' ? 'white' : 'black';
    const profileButtonBackgroundColor = theme === 'dark' ? '#1e1e1e' : '#e6e6e6';

    return (
        <TouchableOpacity style={styles.container} onPress={onClose}>
            <View style={[styles.sidebarContent, { backgroundColor }]}>
                {/* Close Icon */}
                <View style={styles.closeIconContainer}>
                    <Icon name="close" size={30} color="black" />
                </View>
                {/* Profile */}
                <View style={[styles.initialCont, { backgroundColor: profileButtonBackgroundColor }]}>
                    <Text style={{ color: textColor }}>M</Text>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: profileButtonBackgroundColor,
                        padding: 10,
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                    onPress={handleContentPress}>
                    <Text style={{ color: textColor }}>View Profile</Text>
                </TouchableOpacity>

                {/* Sidebar Content */}
                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('Refer')}>
                    <Text style={[styles.link, { color: textColor }]}>Refer and Win</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('Creator')}>
                    <Text style={[styles.link, { color: textColor }]}>Creator Studio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.linkContainer2}
                    onPress={() => navigation.navigate('ForMe')}>
                    <Text style={[styles.link, { color: textColor }]}>My Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.linkContainer2}
                    onPress={handleContentPress}>
                    <Text style={[styles.link, { color: textColor }]}>Buy Subscription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={handleContentPress}>
                    <Text style={[styles.link, { color: textColor }]}>Follow Us</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('Setting')}>
                    <Text style={[styles.link, { color: textColor }]}>Account Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('Store')}>
                    <Text style={[styles.link, { color: textColor }]}>Haat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('T&C')}>
                    <Text style={[styles.link, { color: textColor }]}>Terms and Conditions</Text>
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        zIndex: 999, // Ensure sidebar is above other content
    },
    sidebarContent: {
        width: '80%', // Adjust as needed
        height: '100%', // Take up the full height of the screen
        paddingTop: 50, // Adjust as needed
    },
    link: {
        fontSize: 13,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    linkContainer: {
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        paddingTop: 10,
        borderColor: '#dee2e6',
    },
    linkContainer2: {
        paddingHorizontal: 10,
        backgroundColor: '#d4a373',
        borderBottomWidth: 1,
        paddingTop: 10,
        borderColor: '#dee2e6',
    },
    walletCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#dee2e6',
    },
    closeIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    initialCont: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});
