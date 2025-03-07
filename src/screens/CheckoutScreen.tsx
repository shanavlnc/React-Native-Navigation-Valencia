import React, { useContext } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import { globalStyles } from '../styles/globalStyles';

export default function CheckoutScreen({ navigation }: { navigation: any }) {
  const { cart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

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
      <Text style={globalStyles.title}>Checkout</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image
              source={item.image}
              style={styles.image}
            />
            <View style={styles.productDetails}>
              <Text style={globalStyles.productText} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={globalStyles.productPrice}>
                P{item.price} x {item.quantity}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={globalStyles.total}>Total: P{totalPrice}</Text>
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
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