import axios from 'axios';
import { makeRedirectUri } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';
import { useAuth } from '../context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

const getClientId = () => {
  const extra = Constants.expoConfig?.extra || Constants.manifest?.extra || {};
  return extra.webClientId;
};

export default function VisitorLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const redirectUri = makeRedirectUri({ useProxy: true } as any);
  const [, response, promptAsync] = useAuthRequest({
    clientId: "1060003938013-itqai2kku5vbp9n09et2hnf7nb4rus8e.apps.googleusercontent.com",
    redirectUri,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    const getUserInfo = async (accessToken: string) => {
      try {
        const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const user = await res.json();
        console.log('✅ Google user info:', user);

        const response = await axios.post('http://192.168.0.135:3000/users/register', {
          email: user.email,
          name: user.name,
          picture: user.picture,
          provider: 'google'
        });

        console.log('✅ Backend response:', response.data);

        login(response.data.id, 'visitor');
        router.replace('/visitor-menu');
      } catch (err) {
        console.error('❌ Google login failed:', err);
        Alert.alert('Error', 'Google login failed.');
      }
    };

    if (response?.type === 'success') {
      const token = response.authentication?.accessToken;
      if (token) getUserInfo(token);
    }
  }, [response, router, login]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch('http://192.168.0.135:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const data = await res.json();
      console.log('✅ Visitor login success:', data);

      login(data.user.id, 'visitor');
      router.replace('/visitor-menu');
    } catch (err) {
      console.error('Visitor login error:', err);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

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

      <Text style={{ marginVertical: 8, color: '#888' }}>or</Text>

      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Text style={styles.buttonText}>Continue with Google</Text>
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