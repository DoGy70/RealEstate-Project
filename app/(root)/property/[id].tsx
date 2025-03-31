import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addToFavorites,
  getPropertyById,
  removeFromFavorites,
} from "@/app/appwrite/appwrite";
import { PropertyType } from "@/app/lib/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import icons from "@/app/constants/icons";
import Rooms from "@/app/components/Room";
import Title from "@/app/components/Title";
import Facility from "@/app/components/Facility";
import Gallery from "@/app/components/Gallery";
import Map from "@/app/components/Map";
import Reviews from "@/app/components/Reviews";
import Agent from "@/app/components/Agent";
import { useGlobalContext } from "@/app/lib/useGlobalContext";

const Property = () => {
  const { id } = useLocalSearchParams();
  const { user, favorites, setFavorites } = useGlobalContext();
  const [property, setProperty] = useState<PropertyType>();
  const [favoriteLoading, setFavoritesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

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

  const handleBackButton = () => {
    router.back();
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await getPropertyById(id as string);

        if (response) setProperty(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, []);

  if (loading) {
    return (
      <View
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        className="flex-1  items-center justify-center"
      >
        <ActivityIndicator className="size-32" />
      </View>
    );
  }

  if (!property) {
    return (
      <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <Text>There was no property found with this id</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[{}]}
      className="flex flex-1"
      style={{ paddingBottom: insets.bottom }}
      renderItem={() => {
        return (
          <View>
            <View className="flex-col relative">
              <Swiper className="h-[380px]">
                {property.galleries.map((gallery: any) => {
                  return (
                    <Image
                      source={{ uri: gallery?.image }}
                      key={gallery.image}
                      className="w-full h-[380px]"
                      resizeMode="cover"
                    />
                  );
                })}
              </Swiper>
              <View
                className="flex-row justify-between w-full absolute px-6 items-center"
                style={{ paddingTop: insets.top }}
              >
                <TouchableOpacity onPress={handleBackButton}>
                  <Image source={icons.backArrow} className="size-8" />
                </TouchableOpacity>
                <View className="flex-row gap-5">
                  <TouchableOpacity
                    onPress={
                      favorites.includes(id as string)
                        ? handleRemoveFromFavorites
                        : handleAddToFavorites
                    }
                  >
                    <Image
                      source={icons.heart}
                      className="size-8"
                      tintColor={
                        favoriteLoading
                          ? "#191D3140"
                          : favorites.includes(id as string)
                          ? "#FF0000"
                          : "#191D31"
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={icons.send} className="size-8" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="px-6 py-6">
              <View className="flex flex-col gap-4 pb-6 border-b border-b-gray-300">
                <Text className="font-rubik-bold text-2xl">
                  {property.name}
                </Text>
                <View className="flex-row gap-3">
                  <Text className="bg-primary-300 px-3 py-1 rounded-2xl uppercase text-xs color-primary-100 font-rubik-medium">
                    {property.type}
                  </Text>
                  <View className="flex flex-row items-center gap-1">
                    <Image source={icons.star} className="size-5" />
                    <View className="flex-row">
                      <Text className="font-rubik-medium text-sm text-black-300">
                        {property.rating.toString()}{" "}
                      </Text>
                      <Text className="ml-0.5 font-rubik-medium text-sm text-black-300">
                        ({property.reviews.length} reviews)
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row justify-between items-center">
                  <Rooms
                    icon={icons.bed}
                    number={property.bedrooms}
                    utility={property.bedrooms > 1 ? "Beds" : "Bed"}
                  />
                  <Rooms
                    icon={icons.bath}
                    number={property.bathrooms}
                    utility={property.bathrooms > 1 ? "Baths" : "Bath"}
                  />
                  <Rooms
                    icon={icons.area}
                    number={property.area}
                    utility={"sqft"}
                  />
                </View>
              </View>
              <View className="flex flex-col py-6 ">
                <Agent users={property.users} />
              </View>
              <View className="flex flex-col py-6 gap-3">
                <Title title="Overview" />
                <Text className="font-rubik text-black-300">
                  {property.description}
                </Text>
              </View>
              <View className="flex flex-col py-6 gap-3">
                <Title title="Facilities" />
                <FlatList
                  data={property.facilities}
                  renderItem={({ item }) => {
                    return <Facility facility={item} key={item} />;
                  }}
                  contentContainerClassName="justify-center items-center gap-5"
                  columnWrapperClassName="gap-7 justify-center"
                  numColumns={4}
                />
              </View>
              <View className="flex flex-col py-6">
                <Gallery galleries={property.galleries} />
                <View className="flex flex-col py-6 gap-3">
                  <Title title="Location" />
                  <View className="flex flex-row gap-3 items-center">
                    <Image source={icons.location} className="size-6" />
                    <Text className="font-rubik text-black-300">
                      {property.address}
                    </Text>
                  </View>
                  <Map address={property.address} image={property.image} />
                </View>
                <View className="flex-col pt-6 gap-3">
                  <Reviews
                    reviewNum={property.reviews.length}
                    rating={property.rating}
                    reviews={property.reviews}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      }}
      ListFooterComponent={() => {
        return (
          <View
            className="flex-row px-6 py-6 justify-between border-t border-l border-r border-primary-200 rounded-t-3xl items-center"
            style={{ paddingBottom: insets.bottom }}
          >
            <View className="flex-col gap-2">
              <Text className="uppercase text-sm font-rubik-medium text-black-300">
                Price
              </Text>
              <Text className="text-3xl text-primary-100 font-rubik-bold">
                ${property.price}
              </Text>
            </View>
            <TouchableOpacity className="bg-primary-100 py-4 px-12 rounded-full shadow shadow-black-100">
              <Text className="font-rubik text-white">Booking Now</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default Property;
