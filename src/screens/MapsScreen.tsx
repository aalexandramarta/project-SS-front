import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapsScreen() {
  const webViewRef = useRef<WebView>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required for routing.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });

      console.log('📍 Got user location:', location.coords);
    })();
  }, []);

  const fetchSuggestions = async (text: string) => {
    setQuery(text);
    if (text.length < 3 || !userLocation) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text + ' near ' + userLocation.lat + ',' + userLocation.lon
        )}&limit=5`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectLocation = (lat: string, lon: string) => {
    setResults([]);
    setQuery('');
    Keyboard.dismiss();

    const jsCode = `setDestination(${lat}, ${lon}); true;`;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(jsCode);
    }
  };

  if (!userLocation) {
    return (
      <View style={styles.centered}>
        <Text>Getting your location...</Text>
      </View>
    );
  }

  const filledHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Leaflet Routing</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />
      <style> html, body, #map { height: 100%; margin: 0; padding: 0; } </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
      <script>
        var map = L.map('map').setView([${userLocation.lat}, ${userLocation.lon}], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors'
        }).addTo(map);

        var control = null;
        function setDestination(lat, lng) {
          if (control) map.removeControl(control);
          control = L.Routing.control({
            waypoints: [L.latLng(${userLocation.lat}, ${userLocation.lon}), L.latLng(lat, lng)],
            routeWhileDragging: false
          }).addTo(map);
        }

        window.setDestination = setDestination;
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: filledHtml }}
        style={{ flex: 1 }}
      />

      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={fetchSuggestions}
          placeholder="Search hospital, pharmacy..."
          style={styles.input}
        />
        {loading && <ActivityIndicator size="small" style={{ marginLeft: 10 }} />}
      </View>

      {results.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestion}
                onPress={() => selectLocation(item.lat, item.lon)}
              >
                <Text>{item.display_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
  },
  suggestionsContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    maxHeight: 200,
    borderTopWidth: 1,
    borderColor: '#ccc',
    zIndex: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});