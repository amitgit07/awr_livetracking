export const calculateMapRegion = (
  pickupLat,
  pickupLong,
  dropoffLat,
  dropoffLong,
  routeCoordinates
) => {
  const minLat = Math.min(
    pickupLat,
    dropoffLat,
    ...routeCoordinates.map((coord) => coord.latitude)
  );
  const maxLat = Math.max(
    pickupLat,
    dropoffLat,
    ...routeCoordinates.map((coord) => coord.latitude)
  );
  const minLong = Math.min(
    pickupLong,
    dropoffLong,
    ...routeCoordinates.map((coord) => coord.longitude)
  );
  const maxLong = Math.max(
    pickupLong,
    dropoffLong,
    ...routeCoordinates.map((coord) => coord.longitude)
  );

  const centerLat = (minLat + maxLat) / 2;
  const centerLong = (minLong + maxLong) / 2;
  const latitudeDelta = maxLat - minLat + 0.1; // Add padding to ensure markers are visible
  const longitudeDelta = maxLong - minLong + 0.1; // Add padding to ensure markers are visible

  return {
    latitude: centerLat,
    longitude: centerLong,
    latitudeDelta,
    longitudeDelta,
  };
};


export const decodePolyline = (encoded) => {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let b;
      let shift = 0;
      let result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };