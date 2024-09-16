// screens/ProductsScreen.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const products = [
    { id: '1', name: 'Armchair', image: require('../assets/product1.png'), rating: 0 },
    { id: '2', name: 'Sofa', image: require('../assets/product2.png'), rating: 0 },
    { id: '3', name: 'Table', image: require('../assets/product1.png'), rating: 0 },
    { id: '4', name: 'Bookshelf', image: require('../assets/product2.png'), rating: 0 },
    // Add more products as needed
];

const ProductsScreen = () => {
    const [productRatings, setProductRatings] = useState(products);

    const handleRating = (id, rating) => {
        const updatedRatings = productRatings.map(product =>
            product.id === id ? { ...product, rating } : product
        );
        setProductRatings(updatedRatings);
    };

    const renderStars = (rating, productId) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => handleRating(productId, i)}>
                    <Text style={styles.star}>{i <= rating ? '★' : '☆'}</Text>
                </TouchableOpacity>
            );
        }
        return stars;
    };

    const renderProduct = ({ item }) => (
        <Card style={styles.card}>
            <Card.Cover source={item.image} />
            <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
                <View style={styles.ratingContainer}>
                    {renderStars(item.rating, item.id)}
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/woodbackground.png')}
                style={styles.backgroundImage}
            />
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Woodnet</Text>
            </View>
            <FlatList
                data={productRatings}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with 80% transparency
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B2E19', // A wood-like color
    },
    list: {
        padding: 20,
    },
    card: {
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with 80% transparency
        elevation: 4,
        borderRadius: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    star: {
        fontSize: 24,
        marginHorizontal: 2,
    },
});

export default ProductsScreen;
