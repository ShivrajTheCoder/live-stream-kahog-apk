import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../../contexts/ThemeProvider';
import KeyCenter from '../../KeyCenter';
import axios from 'axios';
const backIcon = <Ionicons name="arrow-back" size={24} />;


const star = <Ionicons name="star" size={24} color="#FFD700" />;
const halfStar = <Ionicons name="star-half" size={24} color="#FFD700" />;
const emptyStar = <Ionicons name="star-outline" size={24} color="black" />; // Empty star icon

// const backIcon = <Ionicons name="arrow-back" size={24}  />;
export default function ProductDetails() {
    const route = useRoute();
    const productId = route.params.productId;
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const apiUrl = KeyCenter.apiUrl;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleBack = () => {
        navigation.goBack();
    };


    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`${apiUrl}/shop/getshopbyid/${productId}`);
                console.log(response.data.shop, "here is teh item")
                if (response.status === 200) {
                    setProduct(response.data.shop);
                } else {
                    setError('Failed to fetch product details');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductById();
    }, [apiUrl, productId]);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(star);
        }

        if (hasHalfStar) {
            stars.push(halfStar);
        }

        while (stars.length < 5) {
            stars.push(emptyStar);
        }

        return (
            <View style={styles.starContainer}>
                {stars.map((icon, index) => (
                    <View key={index}>{icon}</View>
                ))}
            </View>
        );
    };

    // const product = {
    //     id: 6,
    //     image: "https://res.cloudinary.com/dushmacr8/image/upload/v1710399228/kj%20images/haat_images/juitebasket_sv88sa.webp",
    //     name: "Bracelet",
    //     price: 199,
    //     about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni inventore beatae placeat magnam atque sint vero aperiam iure, ducimus, odio quas ipsa enim rem. Quia minima vel dolore nihil fugit?",
    //     review: 4.5
    // };
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: theme === 'dark' ? 'white' : 'black' }]}>Error: {error}</Text>
            </View>
        );
    }
    return (

        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headingContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        {backIcon}
                    </TouchableOpacity>
                    <Text style={[styles.headingText, { color: theme === 'dark' ? 'white' : 'black' }]}>Product Details</Text>
                </View>
                <View style={styles.productContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: product.photo_path }} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.name, { color: theme === 'dark' ? 'white' : 'black' }]}>{product.item_name}</Text>
                        <Text style={[styles.price, { color: theme === 'dark' ? 'white' : 'black' }]}>₹{product.item_price}</Text>
                        <View style={styles.reviewContainer}>
                            {renderStars(4.5)}
                            <Text style={[styles.reviewText, { color: theme === 'dark' ? 'white' : 'black' }]}>(23)</Text>
                        </View>
                        <Text style={[styles.description, { color: theme === 'dark' ? 'white' : 'black' }]}>{product.item_description}</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={[styles.orderButton, { backgroundColor: 'orange' }]}>
                <Text style={styles.orderButtonText}>Order Item</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 100, // Adjust according to button height
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 10,
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    productContainer: {
        flexDirection: 'column',
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    description: {
        marginBottom: 10,
        textAlign: 'left',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'left',
    },
    reviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewText: {
        marginRight: 10,
    },
    starContainer: {
        flexDirection: 'row',
    },
    orderButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
    orderButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
