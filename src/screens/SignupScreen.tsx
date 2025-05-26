import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.135:3000/users/register', {
        name,
        email,
        password
      });

      console.log('Register response:', response.data);
      Alert.alert('Success', 'Registration complete!');
      router.replace('/menu'); // ✅ consistent with expo-router

    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Manual Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.header}>Create an account</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="email@domain.com"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
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
  logoImage: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 20 },
  input: { width: '100%', height: 44, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#000', paddingVertical: 12, width: '100%', borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});