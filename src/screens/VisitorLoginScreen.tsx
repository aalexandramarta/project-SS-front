import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function VisitorLoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Visitor logging in with:', email, password);
    navigation.navigate('VisitorMenu'); // Navigate to VisitorMenuScreen after login
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.header}>Log in</Text>
      <Text style={styles.subheader}>For a visitor</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  subheader: { fontSize: 16, marginBottom: 20 },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
