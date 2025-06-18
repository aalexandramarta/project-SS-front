import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
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
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [pins, setPins] = useState<any[]>([]);

  const fetchNearbyPlaces = async (lat: number, lon: number) => {
    const allResults: any[] = [];

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="pharmacy"](around:5000,${lat},${lon});
        node["amenity"="hospital"](around:10000,${lat},${lon});
      );
      out body;
    `;

    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `data=${encodeURIComponent(query)}`
      });

      const data = await res.json();

      const parsed = data.elements
        .filter((e: any) => e.lat && e.lon)
        .map((e: any) => ({
          lat: e.lat,
          lon: e.lon,
          name: e.tags.name || `${e.tags.amenity}`,
          type: e.tags.amenity,
        }));

      allResults.push(...parsed);
    } catch (err) {
      console.error('❌ Failed to fetch POIs from Overpass:', err);
    }

    return allResults;
  };


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required for routing.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      setUserLocation({ lat, lon });
      const fetchedPins = await fetchNearbyPlaces(lat, lon);
      setPins(fetchedPins);
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
        )}&limit=5`,
        {
          headers: {
            'User-Agent': 'EpicSpots/1.0 (contact@epicspots.app)',
          },
        }
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

    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);

    if (isNaN(parsedLat) || isNaN(parsedLon) || !userLocation) {
      console.warn('Invalid coordinates received.');
      return;
    }

    const jsCode = `setDestination(${userLocation.lat}, ${userLocation.lon}, ${parsedLat}, ${parsedLon}); true;`;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(jsCode);
    }
  };

  const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 100,
    },
    backButtonText: {
      fontSize: 16,
      color: '#007AFF',
      fontWeight: 'bold',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 90,
      paddingHorizontal: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      borderRadius: 6,
    },
    suggestionsContainer: {
      marginTop: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      maxHeight: 200,
    },
    suggestion: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
  });

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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <style> html, body, #map { height: 100%; margin: 0; padding: 0; } </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([${userLocation.lat}, ${userLocation.lon}], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors'
        }).addTo(map);

        var pinGroup = L.layerGroup().addTo(map);
        var routeLayer = null;
        var startMarker, endMarker;

        function setDestination(lat1, lon1, lat2, lon2) {
          if (!lat1 || !lon1 || !lat2 || !lon2) {
            alert("Invalid coordinates for routing.");
            return;
          }

          if (routeLayer) map.removeLayer(routeLayer);
          if (startMarker) map.removeLayer(startMarker);
          if (endMarker) map.removeLayer(endMarker);

          startMarker = L.marker([lat1, lon1], { title: "You are here" }).addTo(map);
          endMarker = L.marker([lat2, lon2], { title: "Destination" }).addTo(map);

          fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", {
            method: "POST",
            headers: {
              "Authorization": "5b3ce3597851110001cf6248accb253177954112bdd45c9f7b35805f",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              coordinates: [[lon1, lat1], [lon2, lat2]]
            })
          })
          .then(res => res.json())
          .then(data => {
            routeLayer = L.geoJSON(data, {
              style: { color: "blue", weight: 5 }
            }).addTo(map);
            map.fitBounds(routeLayer.getBounds());
          })
          .catch(err => {
            alert("No route found (ORS error)");
            console.error(err);
          });
        }

        function showPins(locations) {
          pinGroup.clearLayers();
          locations.forEach(loc => {
            if (!isNaN(loc.lat) && !isNaN(loc.lon)) {
              const icon = L.divIcon({
                className: 'custom-pin',
                html: loc.type === 'pharmacy' ? '💊' : '🏥',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              L.marker([loc.lat, loc.lon], { icon }).addTo(pinGroup).bindPopup(loc.name || "📍");
            }
          });
        }

        const initialPins = ${JSON.stringify(pins)};
        showPins(initialPins);
        window.setDestination = setDestination;
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: filledHtml }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.overlay}>
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
    </View>
  );
}