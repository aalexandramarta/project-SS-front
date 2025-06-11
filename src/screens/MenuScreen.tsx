import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';
import { useAuth } from '../context/AuthContext';



export default function MenuScreen({ navigation }: any) {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>Menu</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => router.push('/ai-voice')}>
          <Text style={styles.menuItem}>⭐ AI voice assistance</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/weather-screen')}>
                  <Text style={styles.menuItem}>⭐ Weather</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/maps')}>
          <Text style={styles.menuItem}>⭐ Maps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/health')}>
          <Text style={styles.menuItem}>⭐ Health</Text>
        </TouchableOpacity>

        <Text style={styles.divider} />

        <TouchableOpacity onPress={() => router.push('/ai-chat')}>
          <Text style={styles.menuItem}>⭐ AI chatbox 24/7</Text>
        </TouchableOpacity>

        {/* ✅ Turned into a working button */}
        <TouchableOpacity onPress={() => router.push('/qrcode')}>
          <Text style={styles.menuItem}>⭐ Connect Cane/Walker</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VisitorConnect')}>
          <Text style={styles.menuItem}>⭐ Connect to visitor</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/personal-info')}>
          <Text style={styles.menuItem}>⭐ Personal information</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
        logout();
          router.replace('/login');
        }}>
          <Text style={styles.menuItem}>🚪 Logout</Text>
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
});
