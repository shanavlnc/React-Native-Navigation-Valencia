import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';
import { Product } from '../context/CartContext';
import { globalStyles } from '../styles/globalStyles';

const products: Product[] = [
  {
    id: 1,
    name: 'Choco Baby',
    price: 50,
    image: require('../assets/ChocoBaby.jpg'),
    description: '32g | Perfect for snacking or sharing',
  },
  {
    id: 2,
    name: 'Cadbury Milk Chocolate',
    price: 100,
    image: require('../assets/Cadbury.jpeg'),
    description: '160g | A classic creamy milk chocolate bar made with fresh milk and cocoa',
  },
  {
    id: 3,
    name: 'Toblerone Milk Chocolate',
    price: 100,
    image: require('../assets/Toblerone.jpg'),
    description: '35g | Luxurious treat perfect for gifting',
  },
  {
    id: 4,
    name: 'Hershey\'s Kisses Milk Chocolate',
    price: 170,
    image: require('../assets/Kisses.jpg'),
    description: '36g | Bite-sized milk chocolate drops, individually wrapped',
  },
  {
    id: 5,
    name: 'Ferrero Rocher',
    price: 270,
    image: require('../assets/Ferrero.jpg'),
    description: '100g | Luxurious treat for special occasions',
  },
  {
    id: 6,
    name: 'Reese\'s Peanut Butter Cups',
    price: 70,
    image: require('../assets/Reeses.jpg'),
    description: '42g | Peanut butter filled chocolates with a sweet and salty combination',
  },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { cart, addToCart } = useContext(CartContext);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const toggleDescription = (productId: number) => {
    if (expandedProductId === productId) {
      setExpandedProductId(null); 
    } else {
      setExpandedProductId(productId); 
    }
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.product}>
            <Image
              source={item.image}
              style={styles.image}
            />
            <View style={styles.productDetails}>
              <Text style={globalStyles.productText} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
              </Text>
              <TouchableOpacity
                style={styles.priceContainer}
                onPress={() => toggleDescription(item.id)}
              >
                <Text style={globalStyles.productPrice}>P{item.price}</Text>
                <MaterialIcons
                  name={expandedProductId === item.id ? 'expand-less' : 'expand-more'}
                  size={20}
                  color="#FF6A00"
                />
              </TouchableOpacity>
              {expandedProductId === item.id && (
                <Text style={styles.descriptionText}>{item.description}</Text>
              )}
            </View>
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
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
});