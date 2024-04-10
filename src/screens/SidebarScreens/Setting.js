import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../../contexts/ThemeProvider';


export default function Setting({ navigation }) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleBack = () => {
        navigation.goBack();    // Handle back button press
    };

    const backIconColor = theme === 'light' ? 'black' : 'white';

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
            {/* Heading */}
            <View style={styles.headingContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons name="arrow-back" size={24} color={backIconColor} />
                </TouchableOpacity>
                <Text style={[styles.headingText, { color: theme === 'light' ? 'black' : 'white' }]}>Settings</Text>
            </View>

            {/* Content */}
            <ScrollView style={styles.content}>
                {/* Toggle Theme */}
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, { color: theme === 'light' ? 'black' : 'white' }]}>Dark Mode</Text>
                    <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
                </View>

                {/* Other Options */}
                <View style={styles.optionContainer}>
                    <View>
                        <Text style={[styles.optionText, { color: theme === 'light' ? 'black' : 'white' }]}>Add To Calendar Reminder</Text>
                        <Text style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 12 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                    </View>
                    <Switch />
                </View>
                <View style={styles.optionContainer}>
                    <View>
                        <Text style={[styles.optionText, { color: theme === 'light' ? 'black' : 'white' }]}>Add Invite Code</Text>
                        <Text style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 12 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                    </View>
                    {/* <Switch /> */}
                </View>
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, { color: theme === 'light' ? 'black' : 'white' }]}>Add Phone</Text>
                </View>
            </ScrollView>

            {/* Delete Account */}
            <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme === 'light' ? 'red' : 'green' }]}>
                <Text style={styles.deleteButtonText}>Delete My Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        flex: 1,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 15,
    },
    optionText: {
        fontSize: 14,
        fontWeight: "bold"
    },
    deleteButton: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 20,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        
    },
});
