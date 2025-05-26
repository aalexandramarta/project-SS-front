import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';


export default function PersonalInfoScreen() {
  const { userId } = useAuth();
  const [gender, setGender] = useState('Male');
  const [info, setInfo] = useState({
    name: '', // ✅ new
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
      userId, // ✅ should now be a valid number
      ...info,
      gender
    });

    const response = await fetch('http://192.168.0.135:3000/users/profile', {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personal Information</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={info.name} onChangeText={v => handleChange('name', v)} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Age:</Text>
        <TextInput style={styles.input} value={info.age} onChangeText={v => handleChange('age', v)} keyboardType="numeric" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Address:</Text>
        <TextInput style={styles.input} value={info.address} onChangeText={v => handleChange('address', v)} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Phone:</Text>
        <TextInput style={styles.input} value={info.phone} onChangeText={v => handleChange('phone', v)} keyboardType="phone-pad" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Emergency Name:</Text>
        <TextInput style={styles.input} value={info.emergencyName} onChangeText={v => handleChange('emergencyName', v)} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Emergency Number:</Text>
        <TextInput style={styles.input} value={info.emergencyPhone} onChangeText={v => handleChange('emergencyPhone', v)} keyboardType="phone-pad" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Medication:</Text>
        <TextInput style={styles.input} value={info.medication} onChangeText={v => handleChange('medication', v)} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Allergies:</Text>
        <TextInput style={styles.input} value={info.allergies} onChangeText={v => handleChange('allergies', v)} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Diseases:</Text>
        <TextInput style={styles.input} value={info.diseases} onChangeText={v => handleChange('diseases', v)} />
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
