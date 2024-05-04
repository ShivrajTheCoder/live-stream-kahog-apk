import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import KeyCenter from '../../KeyCenter';

const ApprovedLiveContainer = ({approvedLive}) => {
    const navigation = useNavigation();

    const handleJoinPress = () => {
        navigation.navigate('HostPage', {
            userID: '1',
            userName: 'user1',
            liveID: approvedLive?.id || '',
        });
    };

    const truncatedHeading = approvedLive?.heading?.length > 40
        ? `${approvedLive.heading.substring(0, 40)}...`
        : approvedLive?.heading || '';

    return (
        <View style={styles.container}>
            {approvedLive ? (
                <TouchableOpacity onPress={handleJoinPress}>
                    <View style={styles.tileCont}>
                        <View style={styles.liveInfo}>
                            <Image style={styles.image} source={{ uri: approvedLive.thumbnail }} />
                            <View style={styles.details}>
                                <Text style={[styles.name, styles.bold]}>{approvedLive.topic}</Text>
                            </View>
                        </View>
                        <Text style={styles.heading}>{approvedLive.description}</Text>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Join as Host</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    tileCont: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 10,
        backgroundColor: '#0077b6',
        borderRadius: 10,
        width: 250,
    },
    image: {
        height: 70,
        width: 70,
        borderTopLeftRadius: 10,
    },
    liveInfo: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    details: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    name: {
        color: 'white',
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FF8C00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    heading: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 2,
        marginHorizontal: 4,
    },
    loadingText: {
        color: 'black',
        fontSize: 16,
    },
});

export default ApprovedLiveContainer;
