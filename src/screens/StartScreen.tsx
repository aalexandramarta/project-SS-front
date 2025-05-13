import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function StartScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text>Are you a cane user?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Are you a visitor user?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 30 },
  button: {
    marginVertical: 10,
    padding: 14,
    width: '80%',
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2
  }
});
