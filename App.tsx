import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as Font from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load the custom fonts
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('./fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./fonts/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('./fonts/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('./fonts/Poppins-Medium.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // Show a loading indicator until the fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6A00" />
      </View>
    );
  }

  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}