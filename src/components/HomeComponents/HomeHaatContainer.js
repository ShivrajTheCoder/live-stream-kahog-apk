import React, { useContext } from 'react';

import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';

import ThemeContext from '../../contexts/ThemeProvider';
import CategoriesSlider from '../EcommerceComponents/CategoriesSlider';
import ProductsContainer from '../EcommerceComponents/ProductsContiner';


export default function HomeHaatContainer({ navigation }) {
    const { theme } = useContext(ThemeContext); // Access theme from ThemeContext

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <View style={styles.headingContainer}>
                {/* <TouchableOpacity onPress={handleBack}>
                    {backIcon}
                </TouchableOpacity> */}
                <Text style={[styles.headingText, { color: theme === 'dark' ? 'white' : 'black' }]}>Kaho G Haat</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <BannerSlider /> */}
                <CategoriesSlider home={true} />
                <ProductsContainer home={true} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 20,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
