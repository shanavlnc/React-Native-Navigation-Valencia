import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { Product } from '../context/CartContext';
import { globalStyles } from '../styles/globalStyles';

const products: Product[] = [
  { id: 1, name: 'Choco Baby', price: 50 },
  { id: 2, name: 'Cadbury', price: 100 },
  { id: 3, name: 'Toblerone', price: 100 },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { cart, addToCart } = useContext(CartContext);

  // total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.product}>
            <Text style={globalStyles.productText}>{item.name} - P{item.price}</Text>
            <Button
              title="Add to Cart"
              onPress={() => addToCart(item)}
              color="#FF6A00"
            />
          </View>
        )}
      />
      <View style={globalStyles.cartSummary}>
        <View style={globalStyles.cartIconContainer}>
          <MaterialIcons name="shopping-cart" size={24} color="#FF6A00" />
          <Text style={globalStyles.cartSummaryText}>{totalItems}</Text>
        </View>
        <Button
          title="Go to Cart"
          onPress={() => navigation.navigate('Cart')}
          disabled={cart.length === 0}
          color={cart.length === 0 ? '#CCCCCC' : '#FF6A00'}
        />
      </View>
    </View>
  );
}