import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import logo from '../assets/sns_logo.png';
import { TouchableOpacity } from 'react-native';


export default function VisitorMenuScreen({ navigation }: any) {

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
      <Text style={styles.title}>Menu</Text>

      <View style={styles.card}>
        <Text>⭐ AI voice assistance</Text>

<TouchableOpacity onPress={() => navigation.navigate('VisitorMaps')}>
  <Text>⭐ Maps</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('VisitorHealth')}>
  <Text>⭐ Health</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('VisitorAIChatScreen')}>
  <Text>⭐ AI chatbox 24/7</Text>
</TouchableOpacity>


        <Text>⭐ Connect to account of Cane/Walker</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  logoImage: { width: 250, height: 100, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20, fontWeight: '600' },
  card: { gap: 10 },
  link: {
    color: '#000',
    textDecorationLine: 'none',
    marginVertical: 4,
  }
});

