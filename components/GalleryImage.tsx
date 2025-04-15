import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { getNumGalleries } from "../lib/lib";

export const GalleryOpacity = ({
  image,
  galleries,
  onPress,
}: {
  image: string;
  galleries: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity className="rounded-xl relative" onPress={onPress}>
      <Image className="size-32 rounded-xl" source={{ uri: image }} />
      <View className="bg-[#00000080] absolute top-0 left-0 size-32 rounded-xl justify-center items-center">
        <Text className="text-white text-center justify-center font-rubik-bold text-lg">
          {getNumGalleries(galleries)}+
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const GalleryImage = ({ image }: { image: string }) => {
  return (
    <View className="rounded-xl">
      <Image className="size-32 rounded-xl" source={{ uri: image }} />
    </View>
  );
};

export default GalleryImage;
