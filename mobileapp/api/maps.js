import { mapsClient } from './index';

const GOOGLE_MAPS_API_KEY = "AIzaSyAFrF_D0WsbMpx6_Bx1qxhDavzAYYUdzPE";

export const getDirections = async (origin, destination) => {
  try {
    const response = await mapsClient.get('/directions/json', {
      params: {
        origin,
        destination,
        key: GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching directions:', error);
    throw error;
  }
};
