import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function ChoiceScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Cane User Account</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 30 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%'
  },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }
});
