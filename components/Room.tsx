import { View, Text, Image } from "react-native";
import React from "react";

const Rooms = ({
  icon,
  number,
  utility,
}: {
  icon: any;
  number: number;
  utility: string;
}) => {
  return (
    <View className="flex-row items-center gap-2">
      <View className="bg-primary-300 px-3 py-3 rounded-full">
        <Image source={icon} className="size-5" />
      </View>
      <Text className="font-rubik-medium text-sm">
        {number} {utility}
      </Text>
    </View>
  );
};

export default Rooms;
