// src/utils/mapUtils.js
import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "../constants";

/**
 * Fetches directions between origin and destination using Google Maps Directions API.
 * Filters the path coordinates based on a skip factor.
 * @param {Object} origin - Origin coordinates { lat, lng }.
 * @param {Object} destination - Destination coordinates { lat, lng }.
 * @param {number} skipFactor - Factor to skip coordinates in the path.
 * @returns {Promise<Array>} Promise resolving to an array of LatLng objects.
 */
export const fetchPathCoordinates = async (
  origin,
  destination,
  skipFactor = 25
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.routes.length > 0) {
      const points = response.data.routes[0].overview_polyline.points;
      const decodedPath = decodePolyline(points);
      console.log(decodedPath)
      return decodedPath.filter((_, index) => index % skipFactor === 0);
    } else {
      console.error("No routes found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching directions:", error);
    return [];
  }
};

/**
 * Decodes Google Maps encoded polyline to an array of LatLng objects.
 * @param {string} encoded - Encoded polyline string from Google Maps API.
 * @returns {Array} Array of LatLng objects.
 */
const decodePolyline = (encoded) => {
  const points = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return points;
};
