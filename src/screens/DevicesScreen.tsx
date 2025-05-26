import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Device = {
  id: number;
  qr_code: string;
  is_connected: boolean;
  is_paired: boolean;
};

const API_URL = 'http://192.168.0.135:3000/devices'; // replace with your IP

const DevicesScreen = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setDevices(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch devices:', err);
        setLoading(false);
      });
  }, []);

  console.log("DevicesScreen loaded");

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 }, // 👈 add background + flex
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  text: { fontSize: 16, marginVertical: 4 }
});


  if (loading) return <Text style={styles.title}>🔥 Devices Screen Active 🔥</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devices</Text>

      {devices.length === 0 ? (
        <Text style={styles.text}>No devices found.</Text>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.text}>
              QR: {item.qr_code} | Connected: {item.is_connected ? 'Yes' : 'No'}
            </Text>
          )}
        />
      )}
    </View>
  );
}

export default DevicesScreen;