import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

import axios from 'axios';
import ThemeContext from '../contexts/ThemeProvider';
import KeyCenter from '../KeyCenter';

export default function Notifications({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const apiUrl = KeyCenter.apiUrl;
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${apiUrl}/others/getnotifications`);
                if (response.status === 200) {
                    console.log(response.data);
                    setNotifications(response.data.notifications);
                } else {
                    console.error('Failed to fetch notifications:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleBack = () => {
        navigation.goBack();    // Handle back button press
    };

    const containerStyle = {
        backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
    };

    const headingTextStyle = {
        color: theme === 'dark' ? 'white' : 'black',
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if single digit
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if single digit
        const year = date.getFullYear().toString().substr(-2); // Extract last two digits of the year
        return `${day}/${month}/${year}`;
    };
    const dateTextStyle = {
        color: theme === 'dark' ? 'white' : 'black',
    };

    const dateContainerStyle = {
        backgroundColor: theme === 'dark' ? '#383838' : '#f0f0f0',
    };

    const notificationItemStyle = {
        backgroundColor: theme === 'dark' ? '#282828' : '#f9f9f9',
    };

    const notificationTextStyle = {
        color: theme === 'dark' ? 'white' : 'black',
    };

    const backButtonColor = theme === 'dark' ? 'white' : 'black';

    return (
        <ScrollView style={[styles.container, containerStyle]}>
            {/* Heading */}
            <View style={styles.headingContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons name="arrow-back" size={24} color={backButtonColor} />
                </TouchableOpacity>
                <Text style={[styles.headingText, headingTextStyle]}>Notifications</Text>
            </View>

            {loading ? (
                <Text>Loading...</Text>
            ) : error || notifications.length === 0 ? (
                <Text>No notifications yet.</Text>
            ) : (
                // Notification Content
                <View style={styles.notificationContainer}>
                    {notifications.map((notificationGroup, index) => {
                        const parsedNotifications = JSON.parse(notificationGroup.notifications);
                        return (
                            <View key={index} style={[styles.notificationGroup, notificationItemStyle]}>
                                <View style={[styles.dateContainer, dateContainerStyle]}>
                                    <Text style={[styles.dateText, dateTextStyle]}>{formatDate(notificationGroup.notification_date)}</Text>
                                </View>
                                {parsedNotifications.map((notification, subIndex) => (
                                    <View key={subIndex} style={styles.notificationItem}>
                                        <View style={styles.profile}>
                                            <Text style={{ color: 'white' }}>M</Text>
                                        </View>
                                        <Text style={[styles.notificationText, notificationTextStyle]}>{notification.description}</Text>
                                    </View>
                                ))}
                            </View>
                        );
                    })}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    notificationContainer: {
        marginBottom: 20,
    },
    dateContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    dateText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    notificationItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    notificationText: {
        fontSize: 12,
        marginLeft: 10
    },
    profile: {
        backgroundColor: "red",
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});
