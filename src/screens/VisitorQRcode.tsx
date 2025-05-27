import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VisitorQRcode() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={require('../assets/sns_logo.png')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Connect cane/walker</Text>
      </TouchableOpacity>

      {/* Leave QR space blank */}
      <View style={styles.qrPlaceholder} />
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
  },
});