import { View, Text, Image } from "react-native";
import React from "react";
import { facilityType } from "../lib/types";
import icons from "../constants/icons";

const getFacilityImage = (facility: facilityType) => {
  switch (facility) {
    case "Car Parking":
      return icons.carPark;
    case "Cutlery":
      return icons.cutlery;
    case "Gym":
      return icons.dumbell;
    case "Laundry":
      return icons.laundry;
    case "Pet Center":
      return icons.dog;
    case "Sports Center":
      return icons.run;
    case "Swimming pool":
      return icons.swim;
    case "Wifi":
      return icons.wifi;
  }
};

const Facility = ({ facility }: { facility: facilityType }) => {
  return (
    <View className="flex flex-col items-center gap-1">
      <View className="bg-primary-300 px-3 py-3 rounded-full">
        <Image source={getFacilityImage(facility)} className="size-8" />
      </View>
      <Text className="text-xs font-rubik ">{facility}</Text>
    </View>
  );
};

export default Facility;
