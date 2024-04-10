import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';

const backIcon = <Ionicons name="arrow-back" size={24} color="black" />;
const coinIcon = <FontAwesome5 name="coins" size={24} color="black" />;

export default function Wallet({ navigation }) {
    const [selectedTab, setSelectedTab] = useState('history');

    const handleBack = () => {
        navigation.goBack();    // Handle back button press
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <View style={styles.container}>
            {/* Top Navigation */}
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    {backIcon}
                </TouchableOpacity>
                <Text style={styles.heading}>Wallet</Text>
            </View>

            {/* Top Section */}
            <View style={styles.topSection}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Total Coins</Text>
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinCount}>100</Text>
                        {coinIcon}
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Redeemable for Cash</Text>
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinCount}>50</Text>
                        {coinIcon}
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Only for In-App Use</Text>
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinCount}>50</Text>
                        {coinIcon}
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'black', padding: 10, margin: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, flexDirection:'row' }} >
                    <Text style={{ color: 'white', marginHorizontal:10, fontSize:15, fontWeight:"800" }}>+</Text>
                    <Text style={{ color: 'white', fontSize:15, fontWeight:"800" }}>Buy Coins</Text>

                </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={[styles.bottomTab, selectedTab === 'history' && styles.selectedTab]}
                    onPress={() => handleTabChange('history')}
                >
                    <Text style={[styles.tabText, selectedTab === 'history' && styles.selectedText]}>History</Text>
                    {selectedTab === 'history' && <View style={styles.selectedUnderline} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.bottomTab, selectedTab === 'inProgress' && styles.selectedTab]}
                    onPress={() => handleTabChange('inProgress')}
                >
                    <Text style={[styles.tabText, selectedTab === 'inProgress' && styles.selectedText]}>In Progress</Text>
                    {selectedTab === 'inProgress' && <View style={styles.selectedUnderline} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.bottomTab, selectedTab === 'redeem' && styles.selectedTab]}
                    onPress={() => handleTabChange('redeem')}
                >
                    <Text style={[styles.tabText, selectedTab === 'redeem' && styles.selectedText]}>Redeem</Text>
                    {selectedTab === 'redeem' && <View style={styles.selectedUnderline} />}
                </TouchableOpacity>
            </View>
            <Text style={styles.bottomContent}>You don't have any transactions yet.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        marginRight: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    topSection: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinCount: {
        marginRight: 5,
    },
    info: {
        color: '#333',
    },
    bottomSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 10,
        justifyContent: 'space-between', // Added to evenly space the tabs
    },
    bottomTab: {
        flex: 1, // Added to make the tab take the whole width
        marginBottom: 10,
        borderBottomWidth: 2, // Added to create the underline effect for the selected tab
        borderBottomColor: 'transparent', // Initially transparent
    },
    selectedTab: {
        borderBottomColor: '#ADD8E6', // Light blue color for the selected tab underline
    },
    selectedUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, // Updated to cover the whole width
        height: 2,
        backgroundColor: '#ADD8E6', // Light blue color
    },
    tabText: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: 10
    },
    selectedText: {
        fontWeight: 'bold',
        textAlign: "center"
    },
    bottomContent: {
        paddingHorizontal: 20,
        color: '#777',
    }
});