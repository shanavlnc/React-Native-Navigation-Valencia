import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
            fontSize: 20, 
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Chocolate Lover Shop' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'My Cart' }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ title: 'Checkout' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}