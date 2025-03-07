import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { globalStyles } from '../styles/globalStyles';

export default function CartScreen({ navigation }: { navigation: any }) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <View style={globalStyles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={globalStyles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={globalStyles.product}>
                <Text style={globalStyles.productText}>
                  {item.name} - P{item.price} x {item.quantity}
                </Text>
                <View style={styles.buttons}>
                  <Button
                    title="+"
                    onPress={() => addToCart(item)}
                    color="#FF6A00"
                  />
                  <View style={styles.buttonSpacer} />
                  <Button
                    title="-"
                    onPress={() => removeFromCart(item)}
                    color="#FF6A00"
                  />
                </View>
              </View>
            )}
          />
          <Text style={globalStyles.total}>Total: P{totalPrice}</Text>
        </>
      )}
      <Button
        title="Checkout"
        onPress={() => navigation.navigate('Checkout')}
        disabled={cart.length === 0}
        color={cart.length === 0 ? '#CCCCCC' : '#FF6A00'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: 8,
  },
  emptyCartContainer: {
    marginBottom: 20,
  },
});