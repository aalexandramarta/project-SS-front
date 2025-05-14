import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function AIVoiceAssistanceScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>AI voice assistance</Text>

      <View style={styles.card}>
        <Text style={styles.info}>
          Press on the voice button to activate the AI voice assistance or say "Hello S&S"
        </Text>
      </View>

      <Text style={styles.mic}>🎤</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
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
