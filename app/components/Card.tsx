import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { CardProps } from "../lib/types";
import icons from "../constants/icons";
import images from "../constants/images";

export const FeaturedCard = ({
  id,
  title,
  image,
  location,
  rating,
  price,
  onPropertyPress,
}: CardProps) => {
  return (
    <TouchableOpacity
      className="w-[250px] h-[340px] rounded-2xl"
      onPress={() => onPropertyPress(id)}
    >
      <Image
        source={{ uri: image }}
        className="relative rounded-3xl w-[250px] h-[340px] "
        resizeMode="cover"
      />
      <Image
        source={images.cardGradient}
        className="absolute bottom-0 rounded-3xl w-[250px] h-[340px]"
        resizeMode="cover"
      />
      <View className="flex-row px-2 py-1 items-center absolute top-7 right-7 gap-1 bg-white rounded-xl">
        <Image source={icons.star} className="size-4" />
        <Text className="text-xs font-rubik-medium text-primary-100">
          {rating}
        </Text>
      </View>
      <View className="flex-col w-full px-6 absolute bottom-5">
        <View className="gap-1">
          <Text className="font-rubik-bold text-white text-lg">{title}</Text>
          <Text className="font-rubik text-white">{location}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="font-rubik-extrabold text-white">${price}</Text>
          <TouchableOpacity className="px-2 py-2">
            <Image source={icons.heart} className="size-6" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Card = ({
  id,
  title,
  image,
  price,
  location,
  onPropertyPress,
}: CardProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPropertyPress(id)}
      className="flex-col px-3 py-3 mb-4 bg-white rounded-lg"
    >
      <View className="gap-1">
        <Image
          source={{ uri: image }}
          className="w-[159px] h-[154px] rounded-lg"
        />
        <Text className="font-rubik-bold">{title}</Text>
        <Text className="font-rubik-light color-black-300 text-sm">
          {location}
        </Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="font-rubik-bold text-primary-100">${price}</Text>
        <TouchableOpacity className="px-2 py-2">
          <Image source={icons.heart} className="size-6" tintColor="#8C8E98" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
