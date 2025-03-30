import { View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getCoordinates } from "../lib/lib";

const PropertyMap = ({
  address,
  image,
}: {
  address: string;
  image: string;
}) => {
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const getGeolocation = async () => {
      try {
        const response = await getCoordinates(address);

        if (!response) throw new Error("Could not find the location");

        setGeolocation({ ...response });
      } catch (error) {}
    };

    getGeolocation();
  }, []);

  return (
    <View className="w-full h-[200px]">
      <MapView
        style={{ height: "100%", width: "100%", borderRadius: 15 }}
        region={{
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        cameraZoomRange={{ maxCenterCoordinateDistance: 600 }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
          }}
        >
          <View className="items-center">
            <View className="w-12 h-12 rounded-full border-4 border-primary-100 overflow-hidden bg-white">
              <Image source={{ uri: image }} className="w-full h-full" />
            </View>
            <View className="w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-t-primary-100 -mt-1" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

export default PropertyMap;
