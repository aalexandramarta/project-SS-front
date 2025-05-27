import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function VisitorHealthScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.button}>Health</Text>

      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.goal}>Goal: 6000</Text>
          <Text style={styles.steps}>2986</Text>
          <Text style={styles.stepsLabel}>Steps</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📍</Text>
          <Text style={styles.statValue}>1.86</Text>
          <Text style={styles.statLabel}>Mile</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>162</Text>
          <Text style={styles.statLabel}>Kcal</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={styles.statValue}>0h 0m</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, alignItems: 'center' },
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
  button: {
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18
  },
  circleContainer: { alignItems: 'center', marginBottom: 20 },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E6F0FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goal: { fontSize: 14, color: '#666' },
  steps: { fontSize: 28, fontWeight: 'bold', color: '#007AFF' },
  stepsLabel: { fontSize: 16 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10
  },
  statBox: { alignItems: 'center', flex: 1 },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 16, fontWeight: 'bold' },
  statLabel: { fontSize: 14, color: '#666' }
});