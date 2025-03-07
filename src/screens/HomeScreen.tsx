import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { Product } from '../context/CartContext';
import { globalStyles } from '../styles/globalStyles';

const products: Product[] = [
  {
    id: 1,
    name: 'Choco Baby (Small Size)',
    price: 50,
    image: require('../assets/ChocoBaby.jpg'),
  },
  {
    id: 2,
    name: 'Cadbury Milk Chocolate',
    price: 100,
    image: require('../assets/Cadbury.jpeg'),
  },
  {
    id: 3,
    name: 'Toblerone Milk Chocolate',
    price: 100,
    image: require('../assets/Toblerone.jpg'),
  },
  {
    id: 4,
    name: 'Hershey\'s Kisses Milk Chocolate',
    price: 170,
    image: require('../assets/Kisses.jpg'),
  },
  {
    id: 5,
    name: 'Ferrero Rocher (8 pieces)',
    price: 270,
    image: require('../assets/Ferrero.jpg'),
  },
  {
    id: 6,
    name: 'Reese\'s Peanut Butter Cups',
    price: 70,
    image: require('../assets/Reeses.jpg'),
  },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { cart, addToCart } = useContext(CartContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.product}>
            {!imageLoaded && <ActivityIndicator size="small" color="#FF6A00" />}
            <Image
              source={item.image}
              style={styles.image}
              onLoad={() => setImageLoaded(true)}
            />
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

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});