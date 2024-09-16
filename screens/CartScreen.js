// screens/CartScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params;

  return (
    <View style={styles.container}>
      <Text>Your Cart:</Text>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <Text key={index}>{item.name} - ${item.price}</Text>
        ))
      ) : (
        <Text>No items in cart.</Text>
      )}
      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Back to Products
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default CartScreen;
