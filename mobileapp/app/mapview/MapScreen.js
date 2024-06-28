import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { doc, updateDoc } from "firebase/firestore/lite";

import firebaseDB from "../../constants/firebase.js";
import { getDirections } from "../../api/maps.js";
import { calculateMapRegion, decodePolyline } from "../../utils/mapHelper.js";

const MapScreen = () => {
  const { pickupLat, pickupLong, dropoffLat, dropoffLong, jobId } =
    useLocalSearchParams();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const response = await getDirections(
          `${pickupLat},${pickupLong}`,
          `${dropoffLat},${dropoffLong}`
        );
        if (response.routes.length > 0) {
          const route = response.routes[0].overview_polyline.points;
          const decodedRoute = decodePolyline(route);
          setRouteCoordinates(decodedRoute);
          const region = calculateMapRegion(
            pickupLat,
            pickupLong,
            dropoffLat,
            dropoffLong,
            decodedRoute
          );
          setRegion(region);
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };
    fetchDirections();
  }, [pickupLat, pickupLong, dropoffLat, dropoffLong]);

  const locationDoc = doc(firebaseDB, "live-location", jobId);

  const animatePath = async () => {

    const numPointsToSkip = Math.ceil(routeCoordinates.length / 28);
    let updates = 0;

    const interval = setInterval(async () => {
      const point = routeCoordinates[updates * numPointsToSkip];
      if (point) {
        try {
          await updateDoc(locationDoc, {
            latitude: point.latitude,
            longitude: point.longitude,
          });
          updates++;
        } catch (error) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
    }, 7000);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{
            latitude: parseFloat(pickupLat),
            longitude: parseFloat(pickupLong),
          }}
          title="Pickup"
        />
        <Marker
          coordinate={{
            latitude: parseFloat(dropoffLat),
            longitude: parseFloat(dropoffLong),
          }}
          title="Dropoff"
        />
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#000" 
            strokeWidth={3}
          />
        )}
      </MapView>
      <Button title="Simulate Movement" onPress={animatePath} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
