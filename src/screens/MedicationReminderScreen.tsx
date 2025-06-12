import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

type Medication = {
  name: string;
  dosage: string;
  instruction: string;
  frequency: string;
  reminderTimes: string[];
};

export default function MedicationReminderScreen() {
  const router = useRouter();
  const { userId } = useAuth();

  const BASE_URL =
    Constants.expoConfig?.extra?.apiBaseUrl ||
    Constants.manifest?.extra?.apiBaseUrl ||
    'http://localhost:3000';

  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', instruction: '', frequency: '', reminderTimes: [''] },
  ]);

  // Optional: Load existing meds on mount (if needed)
  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const res = await fetch(`${BASE_URL}/medications/${userId}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const formatted = data.map((med: any) => ({
            name: med.name,
            dosage: med.dosage_mg,
            instruction: med.instuction,
            frequency: med.reminder?.[0]?.frequency || '',
            reminderTimes: med.reminder.map((r: any) =>
              new Date(r.remind_at).toISOString().substring(11, 16)
            ),
          }));
          setMedications(formatted);
        }
      } catch (err) {
        console.error('Failed to load meds:', err);
      }
    };
    fetchMeds();
  }, []);

  const handleChange = (
    index: number,
    field: keyof Omit<Medication, 'reminderTimes'>,
    value: string
  ) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleReminderChange = (index: number, timeIndex: number, value: string) => {
    const updated = [...medications];
    updated[index].reminderTimes[timeIndex] = value;
    setMedications(updated);
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: '', dosage: '', instruction: '', frequency: '', reminderTimes: [''] },
    ]);
  };

  const addReminderTime = (index: number) => {
    const updated = [...medications];
    updated[index].reminderTimes.push('');
    setMedications(updated);
  };

  const handleSubmit = async () => {
    for (const med of medications) {
      const { name, dosage, instruction, frequency, reminderTimes } = med;
      const validTimes = reminderTimes.filter((t) => /^\d{2}:\d{2}$/.test(t));

      if (!name || !dosage || !frequency || validTimes.length === 0) {
        Alert.alert('Validation Error', 'Please fill in all fields and valid times.');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/medications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            medications: [
              {
                user_id: userId,
                name,
                dosage,
                instruction,
                frequency,
                reminderTimes: validTimes,
              },
            ],
          }),
        });

        if (!response.ok) throw new Error('Failed to save medication');

        // Local notification for each reminder time
        for (const timeStr of validTimes) {
          const [hour, minute] = timeStr.split(':').map(Number);
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `💊 Take ${name}`,
              body: `${dosage} - ${instruction || 'No instructions'}`,
            },
            trigger: {
              hour,
              minute,
              repeats: true,
            } as Notifications.CalendarTriggerInput,
          });
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Could not save medication or schedule notification.');
        return;
      }
    }

    Alert.alert('Success', 'All medications and reminders set.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Medication Reminders</Text>

      {medications.map((med, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.sectionTitle}>Medication {index + 1}</Text>

          <TextInput
            style={styles.input}
            placeholder="Medication Name"
            value={med.name}
            onChangeText={(val) => handleChange(index, 'name', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dosage (e.g., 500mg)"
            value={med.dosage}
            onChangeText={(val) => handleChange(index, 'dosage', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Instruction (e.g., after meals)"
            value={med.instruction}
            onChangeText={(val) => handleChange(index, 'instruction', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Reminder Frequency (e.g., daily, weekly)"
            value={med.frequency}
            onChangeText={(val) => handleChange(index, 'frequency', val)}
          />

          <Text style={styles.label}>Reminder Times (HH:mm):</Text>
          {med.reminderTimes.map((time, tIndex) => (
            <TextInput
              key={tIndex}
              style={styles.input}
              placeholder="e.g., 08:00"
              value={time}
              onChangeText={(val) => handleReminderChange(index, tIndex, val)}
              keyboardType="numeric"
            />
          ))}

          <TouchableOpacity onPress={() => addReminderTime(index)} style={styles.subButton}>
            <Text style={styles.saveText}>+ Add Time</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={addMedication} style={styles.subButton}>
        <Text style={styles.saveText}>+ Add Another Medication</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
        <Text style={styles.saveText}>Save All Reminders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  subButton: {
    backgroundColor: '#AAA',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
