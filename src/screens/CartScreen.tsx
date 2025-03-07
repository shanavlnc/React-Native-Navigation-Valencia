import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { CartContext } from '../context/CartContext';
import { globalStyles } from '../styles/globalStyles';

export default function CartScreen({ navigation }: { navigation: any }) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // total price for all items in the cart
  const checkoutTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

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
                      P{item.price} x {item.quantity} = P{totalPricePerProduct}
                    </Text>
                  </View>
                  <View style={styles.quantityControls}>
                    <Button
                      title="-"
                      onPress={() => removeFromCart(item)}
                      color="#FF6A00"
                    />
                    <View style={styles.buttonSpacer} />
                    <Button
                      title="+"
                      onPress={() => addToCart(item)}
                      color="#FF6A00"
                    />
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.totalContainer}>
            <Text style={globalStyles.total}>Checkout Total: P{checkoutTotal}</Text>
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Checkout"
          onPress={() => navigation.navigate('Checkout')}
          disabled={cart.length === 0}
          color={cart.length === 0 ? '#CCCCCC' : '#FF6A00'}
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
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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