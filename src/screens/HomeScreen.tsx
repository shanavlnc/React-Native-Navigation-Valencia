import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  productText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    flexShrink: 1, // Allow text to shrink if necessary
  },
  productPrice: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'Poppins-Regular',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    fontFamily: 'Poppins-Bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
});