import { PropertyType } from "./types";

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

export function timeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return `преди ${diffInDays} ${diffInDays !== 1 ? "дни" : "ден"}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `преди ${diffInMonths} ${diffInMonths !== 1 ? "месеца" : "месец"}`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `преди ${diffInYears} ${diffInYears !== 1 ? "години" : "година"}`;
}

export const getHighestPricedProperty = (properties: PropertyType[]) => {
  if (properties.length === 0) return null;

  return properties.reduce((maxProperty, currentProperty) => {
    return currentProperty.price > maxProperty.price
      ? currentProperty
      : maxProperty;
  }, properties[0]);
};
