import * as Location from "expo-location";

export const getNumGalleries = (galleries: any) => {
  const numGalleriesDivided = galleries / 10;
  const numGalleries =
    numGalleriesDivided < 1 ? 1 : Math.floor(numGalleriesDivided) * 10;

  return numGalleries;
};

export const getCoordinates = async (address: string) => {
  const apiKey = process.env.EXPO_PUBLIC_GEOCODING_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replaceAll(
    " ",
    "+"
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error(`Geocoding error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
