import axios from 'axios';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Pedometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from '../assets/sns_logo.png';
import { useAuth } from '../context/AuthContext';

interface HealthEntry {
  id?: number;
  user_id?: number;
  date?: string;
  steps?: number;
  distance_km_?: number;
  calories?: number;
  time?: string;
}

export default function HealthScreen() {
  const router = useRouter();
  const { userId } = useAuth();

  const [health, setHealth] = useState<HealthEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [stepCount, setStepCount] = useState(0);
  const [activeMinutes, setActiveMinutes] = useState(0); // ✅ real time tracker
  const [lastStepCount, setLastStepCount] = useState(0);

  const BASE_URL =
    Constants.expoConfig?.extra?.apiBaseUrl ||
    Constants.manifest?.extra?.apiBaseUrl ||
    'http://localhost:3000';

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/health/${userId}`);
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        const todayEntry = res.data.find((entry: HealthEntry) =>
          entry.date?.startsWith(today)
        );

        if (todayEntry) {
          setHealth(todayEntry);
        }
      } catch (err) {
        console.error('Error fetching health data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchHealthData();
  }, [userId]);

  // Step counter
  useEffect(() => {
    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
    });

    return () => subscription.remove();
  }, []);

  // Real timer that tracks active minutes while walking
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (stepCount > lastStepCount) {
      interval = setInterval(() => {
        setActiveMinutes(prev => prev + 1);
      }, 60000); // every 60 seconds
      setLastStepCount(stepCount);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stepCount]);

  const saveProgress = async () => {
    const distanceKm = parseFloat((stepCount * 0.00078).toFixed(2));
    const caloriesBurned = parseFloat((stepCount * 0.04).toFixed(1));
    const timeSpent = `${Math.floor(activeMinutes / 60)}h ${activeMinutes % 60}m`;

    try {
      const res = await axios.post(`${BASE_URL}/health`, {
        user_id: userId,
        date: new Date(),
        steps: stepCount,
        distance_km_: distanceKm,
        calories: caloriesBurned,
        time: timeSpent,
      });
      alert('✅ Progress saved!');
      console.log('Step data saved:', res.data);
    } catch (err) {
      console.error('❌ Failed to save progress:', err);
      alert('Failed to save progress.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  const distance = parseFloat((stepCount * 0.00078).toFixed(2));
  const calories = parseFloat((stepCount * 0.04).toFixed(1));
  const time = `${Math.floor(activeMinutes / 60)}h ${activeMinutes % 60}m`;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.healthButton}>Health</Text>

      <View style={styles.circle}>
        <Text style={styles.stepsLabel}>Goal: 6000</Text>
        <Text style={styles.stepsValue}>{stepCount}</Text>
        <Text style={styles.stepsUnit}>Steps</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>📍</Text>
          <Text style={styles.statValue}>{distance}</Text>
          <Text style={styles.statLabel}>KM</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>{calories}</Text>
          <Text style={styles.statLabel}>Kcal</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={styles.statValue}>{time}</Text>
          <Text style={styles.statLabel}>Time</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProgress}>
        <Text style={styles.saveButtonText}>Save Progress</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingTop: 60 },
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
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});