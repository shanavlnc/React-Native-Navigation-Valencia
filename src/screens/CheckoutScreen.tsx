import React, { useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
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
      {cart.map((item) => (
        <View key={item.id} style={globalStyles.product}>
          <Text style={globalStyles.productText}>
            {item.name} - P{item.price} x {item.quantity}
          </Text>
        </View>
      ))}
      <Text style={globalStyles.total}>Total: P{totalPrice}</Text>
      <Button
        title="Checkout"
        onPress={handleCheckout}
        color="#FF6A00" 
      />
    </View>
  );
}