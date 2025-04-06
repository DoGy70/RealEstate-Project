import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { PropertyType } from "../lib/types";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { getCoordinates } from "../lib/lib";
import { useDebounce, useDebouncedCallback } from "use-debounce";

const ExploreMap = ({ properties }: { properties: PropertyType[] }) => {
  const [propertiesWithGeolocation, setPropertiesWithGeolocation] =
    useState<any>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const getProperties = async () => {
    let newPropertiesWithGeolocation = [];

    for (const property of properties) {
      const geolocation = await getCoordinates(property.address);

      newPropertiesWithGeolocation.push({ ...property, geolocation });
    }

    setPropertiesWithGeolocation([...newPropertiesWithGeolocation]);
  };

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  useEffect(() => {
    getCurrentLocation();
    getProperties();
  }, [properties]);

  if (!location) {
    return (
      <View className="flex-1">
        <Text>We need to use your location for this feature.</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_DEFAULT}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0,
        latitudeDelta: 0,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      cameraZoomRange={{
        minCenterCoordinateDistance: 15,
        maxCenterCoordinateDistance: 2000000,
      }}
      userInterfaceStyle="light"
    >
      {propertiesWithGeolocation.map((property: any) => {
        return (
          <Marker
            coordinate={{
              latitude: property.geolocation.latitude,
              longitude: property.geolocation.longitude,
            }}
            key={property.id}
          >
            <TouchableOpacity className="bg-white px-2 py-2 rounded-full">
              <Text className="font-rubik underline">${property.price}</Text>
            </TouchableOpacity>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default ExploreMap;
