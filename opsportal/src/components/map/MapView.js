// src/components/MapView.js
import React, { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { GOOGLE_MAPS_API_KEY, MAP_ID } from "../../constants";
import { firebasedb } from "../../utils/firebasedb";
import { doc, onSnapshot } from "firebase/firestore";
import MapPointer from "./MapPointer";

const MapView = ({ job }) => {
  const defaultZoom = 12.0;
  const [mapCenter, setMapCenter] = useState({
    lat: 25.0432648,
    lng: 55.1265484,
  });
  const [origin, setOrigin] = useState({
    lat: 25.0432648,
    lng: 55.1265484,
  });
  const [destination, setDestination] = useState({
    lat: 25.2432648,
    lng: 55.1265484,
  });
  const [liveLocation, setLiveLocation] = useState(origin);
  useEffect(() => {
    if (job) {
      const newOrigin = { lat: job.pickup.lat, lng: job.pickup.lng };
      const newDestination = { lat: job.dropoff.lat, lng: job.dropoff.lng };
      setOrigin(newOrigin);
      setDestination(newDestination);
      console.log(job.id)

    }
  }, [job]);

  useEffect(() => {
    if (origin && destination) {
      const centerLat = (origin.lat + destination.lat) / 2;
      const centerLng = (origin.lng + destination.lng) / 2;
      setMapCenter({ lat: centerLat, lng: centerLng });
      console.log({ lat: centerLat, lng: centerLng });
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!job.id) return;
    const locationDoc = doc(firebasedb, "live-location", `${job.id}`);
    const subscribe = onSnapshot(
      locationDoc,
      (doc) => {
        console.log(locationDoc.path);
        if (doc.exists()) {
          const location = {
            lat: doc.data().latitude,
            lng: doc.data().longitude,
          };
          setLiveLocation(location);
        } else {
          setLiveLocation(origin);
        }
      },
      (error) => console.log(error)
    );

    return () => subscribe();
  }, [job.id]);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Map defaultCenter={mapCenter} mapId={MAP_ID} defaultZoom={defaultZoom}>
          {origin && (
            <AdvancedMarker position={origin}>
              <MapPointer type="origin" />
            </AdvancedMarker>
          )}
          {destination && (
            <AdvancedMarker position={destination}>
              <MapPointer type="destination" />
            </AdvancedMarker>
          )}
          {liveLocation && (
            <AdvancedMarker
              position={{ lat: liveLocation.lat, lng: liveLocation.lng }}
            >
              <MapPointer type="live" />
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapView;
