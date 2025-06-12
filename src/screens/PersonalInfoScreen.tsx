import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl ||
  Constants.manifest?.extra?.apiBaseUrl ||
  'http://localhost:3000';

export default function PersonalInfoScreen() {
  const { userId } = useAuth();
  const router = useRouter();
  const [gender, setGender] = useState('Male');
  const [info, setInfo] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    emergencyName: '',
    emergencyPhone: '',
    medication: '',
    allergies: '',
    diseases: ''
  });

  const handleChange = (field: string, value: string) => {
    setInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      console.log('📦 Sending profile data:', {
        userId,
        ...info,
        gender
      });

      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...info,
          gender
        })
      });

      if (!response.ok) throw new Error('Failed to save profile');

      const data = await response.json();
      alert('Profile saved successfully!');
      console.log('✅ Server response:', data);
    } catch (err) {
      console.error('❌ Save error:', err);
      alert('Error saving profile.');
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        console.log('⏳ Waiting for userId...');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/users/profile/${userId}`);
        if (!response.ok) {
          console.log('ℹ️ No existing profile found.');
          return;
        }

        const profile = await response.json();
        console.log('📥 Loaded profile data:', profile);

        setInfo({
          name: profile.name ?? '',
          age: profile.age !== null && profile.age !== undefined ? profile.age.toString() : '',
          address: profile.address ?? '',
          phone: profile.phone ?? '',
          emergencyName: profile.emergencyName ?? '',
          emergencyPhone: profile.emergencyPhone ?? '',
          medication: profile.medication ?? '',
          allergies: profile.allergies ?? '',
          diseases: profile.diseases ?? '',
        });

        setGender(profile.gender ?? 'Male');
      } catch (err) {
        console.error('❌ Error fetching profile:', err);
      }
    };

    loadProfile();
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Personal Information</Text>

      {[
        ['Name', 'name'],
        ['Age', 'age'],
        ['Address', 'address'],
        ['Phone', 'phone'],
        ['Emergency Name', 'emergencyName'],
        ['Emergency Number', 'emergencyPhone'],
        ['Medication', 'medication'],
        ['Allergies', 'allergies'],
        ['Diseases', 'diseases']
      ].map(([label, key]) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={styles.input}
            value={info[key as keyof typeof info]}
            onChangeText={v => handleChange(key, v)}
            keyboardType={key === 'age' || key.toLowerCase().includes('phone') ? 'numeric' : 'default'}
          />
        </View>
      ))}

      <View style={styles.row}>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff'
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
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  row: {
    marginBottom: 15
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6
  },
  picker: {
    height: 40,
    width: '100%'
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center'
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});