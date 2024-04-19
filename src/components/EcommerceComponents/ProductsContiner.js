import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';

const { width } = Dimensions.get('window');
const itemWidth = (width - 80) / 2;

export default function ProductsContainer({ home }) {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const apiUrl = KeyCenter.apiUrl;
    const iconColor = theme === 'dark' ? 'white' : 'black';
    const imageBackground = theme === 'dark' ? 'black' : 'transparent';
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const navigateDetails = (productId) => {
        navigation.navigate("ProductDetails", { productId });
    };
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/shop/getshop`);
                console.log(response.data.shops, "here is hte shop")
                if (response.status === 200) {
                    setProducts(response.data.shops.slice(0, 4));
                } else {
                    setError('Failed to fetch products');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
                <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
                <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Error: {error}</Text>
            </View>
        );
    }

    const renderedProducts = products.map(product => (
        <TouchableOpacity
            key={product.id}
            style={styles.product}
            onPress={() => navigateDetails(product.id)}
        >

            <Image source={{ uri: product.photo_path }} style={[styles.image, { backgroundColor: imageBackground }]} />
            <Text style={[styles.name, { color: iconColor }]}>{product.item_name}</Text>
            <Text style={[styles.price, { color: iconColor }]}>₹{product.item_price}</Text>
        </TouchableOpacity>
    ));

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.title, { color: iconColor }]}>Category Name</Text>
            <View style={styles.productContainer}>
                {renderedProducts}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
    },
    product: {
        width: itemWidth,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    name: {
        marginTop: 5,
        textAlign: 'center',
    },
    price: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 5,
    },
    title: {
        color: 'black',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
});
