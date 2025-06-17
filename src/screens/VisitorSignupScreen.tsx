import axios from 'axios';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import logo from '../assets/sns_logo.png';
import { useAuth } from '../context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

const BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl ||
  Constants.manifest?.extra?.apiBaseUrl ||
  'http://localhost:3000';

export default function VisitorSignupScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectUri = 'https://auth.expo.io/@ssproject/SandS';
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
        console.log('✅ Google user info fetched:', user);

        const response = await axios.post(`${BASE_URL}/users/register`, {
          email: user.email,
          name: user.name,
          picture: user.picture,
          provider: 'google'
        });

        console.log('✅ Backend response:', response.data);

        login(response.data.id, 'visitor');
        Alert.alert('Login successful!');
        router.push('/visitor-menu');
      } catch (error) {
        console.error('❌ Google registration failed:', error);
        Alert.alert('Error', 'Could not register Google user.');
      }
    };

    if (response?.type === 'success') {
      const token = response.authentication?.accessToken;
      if (token) getUserInfo(token);
    } else if (response?.type === 'error') {
      Alert.alert('Login failed');
    }
  }, [response, router, login]);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        email,
        password,
        provider: 'local'
      });

      console.log('Visitor registered:', response.data);
      login(response.data.id, 'visitor');
      Alert.alert('Success', 'Visitor registration complete!');
      router.push('/visitor-menu');
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  const showMessage = (type: string) => {
    if (type === 'Terms of Service') {
      Alert.alert('Terms of Service', 'You agree to use the app responsibly and not misuse user data.');
    } else {
      Alert.alert('Privacy Policy', 'We collect only necessary data and never share it without your permission.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.header}>Create an account</Text>
      <Text style={styles.subheader}>For a visitor</Text>

      <TextInput
        placeholder="email@domain.com"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.or}>or</Text>

      <TouchableOpacity style={styles.oauth} onPress={() => promptAsync()}>
        <Text>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.oauth}>
        <Text>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By clicking continue, you agree to our{' '}
        <Text style={styles.link} onPress={() => showMessage('Terms of Service')}>Terms of Service</Text> and{' '}
        <Text style={styles.link} onPress={() => showMessage('Privacy Policy')}>Privacy Policy</Text>
      </Text>
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
  input: { width: '100%', height: 44, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#000', paddingVertical: 12, width: '100%', borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  or: { marginVertical: 8, color: '#888' },
  oauth: { backgroundColor: '#eee', paddingVertical: 12, width: '100%', borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  terms: { fontSize: 12, color: '#666', marginTop: 20, textAlign: 'center' },
  link: { color: '#000', textDecorationLine: 'underline' }
});