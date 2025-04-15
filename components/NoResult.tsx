import { View, Text, Image } from "react-native";
import React from "react";
import images from "../constants/images";

const NoResult = ({ title }: { title: string }) => {
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <Image source={images.noResult} className="size-64" />
      <Text className="text-lg text-primary-100 font-rubik-bold">{title}</Text>
    </View>
  );
};

export default NoResult;
