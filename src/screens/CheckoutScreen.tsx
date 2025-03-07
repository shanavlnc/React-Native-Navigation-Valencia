import React, { useContext } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import { globalStyles } from '../styles/globalStyles';

export default function CheckoutScreen({ navigation }: { navigation: any }) {
  const { cart, clearCart } = useContext(CartContext);

  // the total price for all items in the cart
  const checkoutTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    Alert.alert('Checkout successful', 'Thank you for your purchase!', [
      {
        text: 'OK',
        onPress: () => {
          clearCart(); // clear the cart
          // reset to homepage after checkout
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // the total price for this product
          const totalPricePerProduct = item.price * (item.quantity || 1);

          return (
            <View style={globalStyles.product}>
              <Image
                source={item.image}
                style={styles.image}
              />
              <View style={styles.productDetails}>
                <Text style={globalStyles.productText} numberOfLines={2} ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text style={globalStyles.productPrice}>
                  P{totalPricePerProduct}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.totalContainer}>
        <Text style={globalStyles.total}>Checkout Total: P{checkoutTotal}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Checkout"
          onPress={handleCheckout}
          color="#FF6A00"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});