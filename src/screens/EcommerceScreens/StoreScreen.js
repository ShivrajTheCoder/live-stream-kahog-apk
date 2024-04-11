import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import BannerSlider from '../../components/EcommerceComponents/BannerSlider';
import CategoriesSlider from '../../components/EcommerceComponents/CategoriesSlider';
import ProductsContainer from '../../components/EcommerceComponents/ProductsContiner';
import ThemeContext from '../../contexts/ThemeProvider';


const backIcon = <Ionicons name="arrow-back" size={24} color="black" />;

export default function StoreScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <View style={styles.headingContainer}>
                <TouchableOpacity onPress={handleBack}>
                    {backIcon}
                </TouchableOpacity>
                <Text style={[styles.headingText, { color: theme === 'dark' ? 'white' : 'black' }]}>Our Store</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BannerSlider />
                <CategoriesSlider />
                <ProductsContainer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
