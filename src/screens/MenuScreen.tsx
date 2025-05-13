import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import logo from '../assets/sns_logo.png';
import { TouchableOpacity } from 'react-native';


export default function MenuScreen({ navigation }: any) {
  return (
<View style={styles.card}>
  <Text>⭐ AI voice assistance</Text>
<TouchableOpacity onPress={() => navigation.navigate('Maps')}>
  <Text>⭐ Maps</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Health')}>
  <Text>⭐ Health</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('AIChatScreen')}>
  <Text>⭐ AI chatbox 24/7</Text>
</TouchableOpacity>



  <Text>⭐ Connect Cane/Walker</Text>
  <Text>⭐ Connect to visitor</Text>
</View>

  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20, fontWeight: '600' },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    gap: 10
  }
});
