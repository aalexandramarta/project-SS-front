import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function HealthScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.healthButton}>Health</Text>

      <View style={styles.circle}>
        <Text style={styles.stepsLabel}>Goal: 6000</Text>
        <Text style={styles.stepsValue}>2986</Text>
        <Text style={styles.stepsUnit}>Steps</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>📍</Text>
          <Text style={styles.statValue}>1.86</Text>
          <Text style={styles.statLabel}>Mile</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>162</Text>
          <Text style={styles.statLabel}>Kcal</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={styles.statValue}>0h 0m</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingTop: 60 },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 10 },
  healthButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    color: '#007AFF',
    marginBottom: 20,
    fontWeight: '500',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  stepsLabel: { color: '#fff', fontSize: 12 },
  stepsValue: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  stepsUnit: { color: '#fff', fontSize: 14 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
  },
  stat: { alignItems: 'center' },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#444' },
});
