import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function VisitorMenuScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>Menu</Text>

      <View style={styles.card}>
        <Text>⭐ AI voice assistance</Text>
        <Text>⭐ Maps</Text>
        <Text>⭐ Health</Text>
        <Text>⭐ Personal information</Text>
        <Text>⭐ AI chatbox 24/7</Text>
        <Text>⭐ Connect to account of Cane/Walker</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20, fontWeight: '600' },
  card: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 12, elevation: 2, gap: 10 }
});
