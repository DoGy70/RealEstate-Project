import { View, Text, Image } from "react-native";
import React from "react";
import { facilityType } from "../lib/types";
import icons from "../constants/icons";

const getFacilityImage = (facility: facilityType) => {
  switch (facility) {
    case "Паркинг":
      return icons.carPark;
    case "Прибори":
      return icons.cutlery;
    case "Фитнес":
      return icons.dumbell;
    case "Пералня":
      return icons.laundry;
    case "Кът за любимци":
      return icons.dog;
    case "Спортен център":
      return icons.run;
    case "Басейн":
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
