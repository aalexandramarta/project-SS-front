import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VisitorQRConnectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={require('../assets/sns_logo.png')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Connect to account of cane/walker</Text>
      </TouchableOpacity>

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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
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