import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import logo from '../assets/sns_logo.png';

export default function VisitorSignupScreen({ navigation }: any) {
const showMessage = (type: string) => {
  if (type === 'Terms of Service') {
    Alert.alert('Terms of Service', 'You agree to use the app responsibly and not misuse user data.');
  } else {
    Alert.alert('Privacy Policy', 'We collect only necessary data and never share it without your permission.');
  }
};


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.header}>Create an account</Text>
      <Text style={styles.subheader}>For a visitor</Text>

      <TextInput
        placeholder="email@domain.com"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VisitorMenu')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.or}>or</Text>

      <TouchableOpacity style={styles.oauth}>
        <Text>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.oauth}>
        <Text>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By clicking continue, you agree to our{' '}
        <Text style={styles.link} onPress={() => showMessage('Terms of Service')}>Terms of Service</Text> and{' '}
        <Text style={styles.link} onPress={() => showMessage('Privacy Policy')}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  subheader: { fontSize: 16, marginBottom: 20 },
  input: { width: '100%', height: 44, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#000', paddingVertical: 12, width: '100%', borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  or: { marginVertical: 8, color: '#888' },
  oauth: { backgroundColor: '#eee', paddingVertical: 12, width: '100%', borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  terms: { fontSize: 12, color: '#666', marginTop: 20, textAlign: 'center' },
  link: { color: '#000', textDecorationLine: 'underline' }
});
