import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function VisitorMenuScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>Menu</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('VisitorAIVoiceAssistance')}>
          <Text style={styles.menuItem}>⭐ AI voice assistance</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VisitorMaps')}>
          <Text style={styles.menuItem}>⭐ Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VisitorHealth')}>
          <Text style={styles.menuItem}>⭐ Health</Text>
        </TouchableOpacity>

        <Text style={styles.divider} />

        <TouchableOpacity onPress={() => navigation.navigate('VisitorAIChatScreen')}>
          <Text style={styles.menuItem}>⭐ AI chatbox 24/7</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VisitorPersonalInfo')}>
          <Text style={styles.menuItem}>⭐ Personal information</Text>
        </TouchableOpacity>


        <Text style={styles.menuItem}>⭐ Connect to account of Cane/Walker</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: '600', marginVertical: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 12,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 12,
  },
});
