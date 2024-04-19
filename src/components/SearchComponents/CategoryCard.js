import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import ThemeContext from '../../contexts/ThemeProvider';

export default function CategoryCard({ data }) {
    const [showSub, setShowSub] = useState(false);
    const { theme } = useContext(ThemeContext);
    const iconColor = theme === 'dark' ? 'white' : 'black';

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white' }]}>
            <View style={styles.categoryHeader}>
                <Text style={[styles.categoryHeaderText, { color: theme === 'dark' ? 'white' : 'black' }]}>{data.category_name}</Text>
                <TouchableOpacity onPress={() => setShowSub(!showSub)}>
                    <AntDesign name={showSub ? "up" : "down"} size={24} color={iconColor} />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal>
                {
                    showSub && <View style={styles.subcategoryContainer}>
                        {data.subcategories.map((sub) => (
                            <TouchableOpacity key={sub} style={styles.subcategory}>
                                <Text style={[styles.subcategoryText, { color: theme === 'dark' ? 'white' : '#03045e' }]}>{sub}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    categoryHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    subcategoryContainer: {
        flexDirection: "row",
    },
    subcategory: {
        padding: 10,
        margin: 10,
        borderRadius: 15,
    },
    subcategoryText: {
        fontSize: 16,
    },
});
