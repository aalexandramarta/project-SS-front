// screens/FallDetectedScreen.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function FallDetectedScreen() {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === 1) {
          clearInterval(interval);
          console.log("📞 Simulated call to 112 placed");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cancelCall = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>🚨 Fall Detected!</Text>
      <Text style={styles.text}>Calling 112 in {secondsLeft} seconds...</Text>
      <View style={styles.button}>
        <Button title="Cancel" onPress={cancelCall} color="#d9534f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffecec' },
  alert: { fontSize: 32, fontWeight: 'bold', color: 'red', marginBottom: 20 },
  text: { fontSize: 20, marginBottom: 20 },
  button: { marginTop: 20, width: '60%' },
});