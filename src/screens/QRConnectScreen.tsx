import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function QRConnectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('../assets/sns_logo.png')} style={styles.logo} resizeMode="contain" />

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Connect cane/walker</Text>
      </TouchableOpacity>

      {/* Security Code Input */}
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
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  logo: {
    width: 180,
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