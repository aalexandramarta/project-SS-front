// src/screens/VisitorQRConnectScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

export default function VisitorQRConnectScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/sns_logo.png')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Connect to account of cane/walker</Text>
      </TouchableOpacity>

      {/* Leave QR space blank */}
      <View style={styles.qrPlaceholder} />

      <TextInput
        style={styles.input}
        placeholder="Security Code?"
        placeholderTextColor="#007BFF"
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  qrPlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
});
