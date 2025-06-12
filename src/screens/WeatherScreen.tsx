import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WeatherScreen() {
  const router = useRouter();
  const [weather, setWeather] = useState<any>(null);
  const [precipitation, setPrecipitation] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=51.025&longitude=4.477&current_weather=true&hourly=precipitation&timezone=auto'
        );
        const data = await res.json();
        const currentHour = new Date(data.current_weather.time).getHours();
        const rainValue = data.hourly.precipitation[currentHour];

        setWeather(data.current_weather);
        setPrecipitation(rainValue);
      } catch (err) {
        console.error('Weather error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (!weather) return <Text style={styles.error}>⚠️ Failed to load weather.</Text>;

  const direction = (deg: number) => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
  };

  const updatedTime = new Date(weather.time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🌤️ Weather in Mechelen</Text>
      <Text style={styles.temp}>{Math.round(weather.temperature)}°C</Text>
      <Text style={styles.detail}>
        💨 Wind: {weather.windspeed} km/h {direction(weather.winddirection)}
      </Text>
      {precipitation !== null && (
        <Text style={styles.detail}>
          ☔ Rain: {precipitation > 0 ? `${precipitation} mm/h` : 'No rain'}
        </Text>
      )}
      <Text style={styles.detail}>🕒 Updated: {updatedTime}</Text>
      <Text style={styles.note}>Stay safe and dress appropriately! 🧥🌂</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Added white background
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 2,
  },
  note: {
    fontSize: 16,
    marginTop: 20,
    color: '#555',
    textAlign: 'center',
  },
  error: {
    marginTop: 40,
    fontSize: 16,
    color: 'red',
  },
});