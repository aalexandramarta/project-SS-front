import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapsScreen() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      let current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);
      setLoading(false);
    })();
  }, []);

  const mapHtml = location
    ? `<!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
          #info { position: absolute; top: 10px; left: 10px; background: white; padding: 6px; z-index: 999; font-size: 14px; }
          #buttons { position: absolute; top: 80px; left: 10px; z-index: 999; }
          .btn { margin-bottom: 4px; padding: 5px 8px; border: none; background: #ccc; border-radius: 3px; }
          .btn.active { background: #007AFF; color: white; }
        </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      </head>
      <body>
        <div id="map"></div>
        <div id="info">Tap to set destination</div>
        <div id="buttons">
          <button class="btn active" data-mode="foot-walking">Foot</button>
          <button class="btn" data-mode="driving-car">Car</button>
          <button class="btn" data-mode="cycling-regular">Bike</button>
        </div>
        <script>
          var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

          var from = [${location.longitude}, ${location.latitude}];
          var to = [-0.1278, 51.5074];
          var routeLayer, destMarker;
          var travelMode = 'foot-walking';

          L.marker([${location.latitude}, ${location.longitude}]).addTo(map).bindPopup('You are here').openPopup();

          function drawRoute(toCoords) {
            fetch('https://api.openrouteservice.org/v2/directions/' + travelMode + '/geojson', {
              method: 'POST',
              headers: {
                'Authorization': '5b3ce3597851110001cf6248accb253177954112bdd45c9f7b35805f',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ coordinates: [from, toCoords] })
            })
            .then(r => r.json())
            .then(data => {
              if (routeLayer) map.removeLayer(routeLayer);
              routeLayer = L.geoJSON(data, { style: { color: 'blue' } }).addTo(map);
              var s = data.features[0].properties.summary;
              document.getElementById('info').innerHTML = 
                'Distance: ' + (s.distance/1000).toFixed(2) + ' km<br>Duration: ' + Math.round(s.duration/60) + ' min';
            })
            .catch(e => alert('Route error: ' + e.message));
          }

          function setDestination(lat, lng) {
            var coords = [lng, lat];
            if (destMarker) map.removeLayer(destMarker);
            destMarker = L.marker([lat, lng]).addTo(map).bindPopup('Destination');
            drawRoute(coords);
          }

          setDestination(51.5074, -0.1278);
          map.on('click', e => setDestination(e.latlng.lat, e.latlng.lng));

          document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => {
              document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              travelMode = btn.getAttribute('data-mode');
              if (destMarker) {
                var latlng = destMarker.getLatLng();
                setDestination(latlng.lat, latlng.lng);
              }
            });
          });
        </script>
      </body>
      </html>`
    : '';

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <WebView originWhitelist={['*']} source={{ html: mapHtml }} style={{ flex: 1 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});