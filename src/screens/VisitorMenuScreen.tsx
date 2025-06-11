import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';
import { useAuth } from '../context/AuthContext';

export default function VisitorMenuScreen({ navigation }: any) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>Menu</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => router.push('/visitor-ai-voice')}>
          <Text style={styles.menuItem}>⭐ AI voice assistance</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/weather-screen')}>
          <Text style={styles.menuItem}>⭐ Weather</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/visitor-maps')}>
          <Text style={styles.menuItem}>⭐ Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/visitor-health')}>
          <Text style={styles.menuItem}>⭐ Health</Text>
        </TouchableOpacity>

        <Text style={styles.divider} />

        <TouchableOpacity onPress={() => router.push('/visitor-ai-chat')}>
          <Text style={styles.menuItem}>⭐ AI chatbox 24/7</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/visitor-info')}>
          <Text style={styles.menuItem}>⭐ Personal information</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/visitor-qr')}>
          <Text style={styles.menuItem}>⭐ Connect cane/walker</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/visitor-qr-connect')}>
          <Text style={styles.menuItem}>⭐ Connect to account of Cane/Walker</Text>
        </TouchableOpacity>

        <Text style={styles.divider} />

        {/* 🚪 Logout button */}
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.menuItem, styles.logout]}>🚪 Logout</Text>
        </TouchableOpacity>
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
  logout: {
    color: '#c00',
    fontWeight: 'bold',
  },
});