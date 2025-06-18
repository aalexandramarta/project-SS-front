import { useRouter } from 'expo-router'; // ✅ ADD THIS
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function ChoiceScreen() {
  const router = useRouter(); // ✅ HOOK

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Premium User Account</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/signup')}>
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
  },  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,},

  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
    backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
