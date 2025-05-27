import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function VisitorAIVoiceAssistanceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>AI voice assistance</Text>

      <View style={styles.card}>
        <Text style={styles.info}>
          Press on the voice button to activate the AI voice assistance or say Hello S&S
        </Text>
      </View>

      <Text style={styles.mic}>🎤</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
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
  logoImage: { width: 250, height: 100, resizeMode: 'contain', marginVertical: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30
  },
  info: { textAlign: 'center', fontSize: 14, color: '#007AFF' },
  mic: { fontSize: 40 }
});