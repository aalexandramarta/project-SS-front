import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function VisitorMapsScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const router = useRouter();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={logo} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="From"
          value={from}
          onChangeText={setFrom}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="To"
          value={to}
          onChangeText={setTo}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={{ color: '#888' }}>Map goes here (placeholder)</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20
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
    width: 220,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20
  },
  inputContainer: {
    gap: 10,
    marginBottom: 20
  },
  input: {
    height: 44,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});