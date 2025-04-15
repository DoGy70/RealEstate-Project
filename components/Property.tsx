import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import icons from "../constants/icons";
import { useGlobalContext } from "../lib/useGlobalContext";
import { addToFavorites, removeFromFavorites } from "../app/appwrite/user";

interface PropertProps {
  id: string;
  image: string;
  name: string;
  address: string;
  price: number;
  rating: number;
}

const Property = ({
  id,
  image,
  name,
  address,
  price,
  rating,
}: PropertProps) => {
  const [favoriteLoading, setFavoritesLoading] = useState(false);
  const { user, favorites, setFavorites } = useGlobalContext();

  const handleAddToFavorites = async () => {
    try {
      setFavoritesLoading(true);
      await addToFavorites(user.id, id as string);
      setFavorites((oldFavorites) => [...oldFavorites, id as string]);
    } catch (error) {
      console.error();
    } finally {
      setFavoritesLoading(false);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      setFavoritesLoading(true);
      await removeFromFavorites(user.id, id as string);
      setFavorites((oldFavorites) => {
        const newFavorites = oldFavorites.filter(
          (oldFavorite) => oldFavorite !== id
        );

        return [...newFavorites];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setFavoritesLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/(root)/property/${id}`)}
      className="w-full bg-white px-4 py-3 rounded-3xl"
    >
      <View className="flex-row justify-between w-full">
        <View className="flex-row gap-3 items-center">
          <View className="relative">
            <Image source={{ uri: image }} className="size-28 rounded-2xl" />
            <View className="absolute top-2 right-2 bg-white rounded-full px-2 gap-1 flex-row items-center">
              <Image source={icons.star} className="size-3" />
              <Text className="text-xs font-rubik text-primary-100">
                {rating}
              </Text>
            </View>
          </View>
          <View className="flex-col gap-3 py-2">
            <Text className="font-rubik-bold text-lg">{name}</Text>
            <Text className="font-rubik-medium text-black-300 max-w-40 text-xs">
              {address}
            </Text>
          </View>
        </View>
        <View className="flex-col justify-between items-center py-2">
          <TouchableOpacity
            className="px-2 py-2"
            onPress={
              favorites.includes(id as string)
                ? handleRemoveFromFavorites
                : handleAddToFavorites
            }
          >
            <Image
              source={icons.heart}
              className="size-6"
              tintColor={
                favoriteLoading
                  ? "#191D3140"
                  : favorites.includes(id as string)
                  ? "#FF0000"
                  : "#191D31"
              }
            />
          </TouchableOpacity>
          <Text className="font-rubik-bold text-primary-100">{price}лв.</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Property;
