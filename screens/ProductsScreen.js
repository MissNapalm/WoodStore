import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, FlatList, Image, ImageBackground } from 'react-native';

const DRAWER_WIDTH = 250;

// Sample product data
const passionateDescriptions = [
  "Indulge in the epitome of comfort with our plush velvet sofa. Its curves invite you to sink in, while the rich fabric adds a touch of luxury to any room.",
  "Crafted from solid oak, this dining table is a statement piece that will stand the test of time. Its clean lines and warm finish create a welcoming atmosphere for family and friends.",
  "Elevate your bedroom with this elegant headboard. Its intricate detailing and soft fabric add a touch of sophistication to your space. Drift off to sleep in comfort and style.",
  "Our ergonomic desk chair is designed to provide optimal support and comfort, even during long hours of work. Its adjustable features allow you to find the perfect fit for your body.",
  "This versatile coffee table is perfect for both entertaining and everyday use. Its sleek design and spacious surface provide ample room for snacks, drinks, and books.",
  "Add a touch of whimsy to your home with our playful armchair. Its unique shape and vibrant colors will brighten up any room and spark conversations.",
  "Our modern bookshelf is a functional and stylish addition to any space. Its open shelves provide ample storage for books, plants, and decor items.",
  "This handcrafted nightstand is a beautiful and practical piece of furniture. Its drawers offer plenty of storage for your essentials, while its unique design adds a touch of personality to your bedroom.",
  "Our spacious dresser provides ample storage for your clothing and accessories. Its clean lines and durable construction make it a practical and stylish addition to any bedroom.",
  "Create a cozy and inviting atmosphere with our plush throw blanket. Its soft fabric and neutral color make it the perfect addition to any sofa or bed.",
];

const products = Array.from({ length: 10 }, (v, k) => ({
  id: (k + 1).toString(),
  name: `Product ${k + 1}`,
  image: k % 2 === 0 ? require('../assets/product1.png') : require('../assets/product2.png'),
  description: passionateDescriptions[k],
  rating: 0,
}));

const ProductsScreen = () => {
  const [productRatings, setProductRatings] = useState(products);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const toggleDrawer = () => {
    const toValue = drawerOpen ? -DRAWER_WIDTH : 0;
    Animated.timing(drawerAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setDrawerOpen(!drawerOpen);
    });
  };

  const handleRating = (id, rating) => {
    const updatedRatings = productRatings.map(product =>
      product.id === id ? { ...product, rating } : product
    );
    setProductRatings(updatedRatings);
  };

  // Render a product item
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.ratingContainer}>
        {renderStars(item.rating, item.id)}
      </View>
    </View>
  );

  // Render star rating
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

  return (
    <ImageBackground source={require('../assets/woodbackground.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Drawer */}
        <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
          <ImageBackground source={require('../assets/drawer.png')} style={styles.drawerImage}>
            <View style={styles.drawerHeader}>
              <Text style={styles.greeting}>Hello, Sarah!</Text>
              <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>☰</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.drawerContent}>
              <TouchableOpacity style={styles.drawerItem}>
                <Text style={styles.drawerItemText}>• Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem}>
                <Text style={styles.drawerItemText}>• My Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem}>
                <Text style={styles.drawerItemText}>• Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerItem}>
                <Text style={styles.drawerItemText}>• Contact</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.drawerFooter}>
              <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>
        {/* Main Header */}
        <ImageBackground
          source={require('../assets/header.png')}
          style={styles.header}
        >
          {!drawerOpen && (
            <TouchableOpacity onPress={toggleDrawer} style={styles.mainMenuButton}>
              <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
          )}
          <Image source={require('../assets/woodnet.png')} style={styles.logoImage} />
          <Image source={require('../assets/cart.png')} style={styles.cartImage} />
        </ImageBackground>
        {/* Product List */}
        <FlatList
          data={productRatings}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    width: '100%',
    height: 85,
    paddingTop: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
  },
  mainMenuButton: {
    position: 'absolute',
    left: 20,
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoImage: {
    right: 13,
    padding: 10,
    width: 220,
    height: 200,
    resizeMode: 'contain',
  },
  cartImage: {
    paddingTop: 32,
    top: 26,
    position: 'absolute',
    right: 20,
    width: 45,
    height: 32,
    resizeMode: 'contain',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  drawerImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  drawerContent: {
    padding: 20,
    flex: 1,
  },
  drawerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  drawerItemText: {
    fontSize: 18,
    color: '#fff',
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  productList: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 10,
    fontSize: 20,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
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