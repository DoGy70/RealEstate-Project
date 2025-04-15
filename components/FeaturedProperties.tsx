import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import NotificationBell from "./NotificationBell";
import { PropertyType } from "../lib/types";
import { useSearchParams } from "expo-router/build/hooks";
import { getFilteredFeaturedProperties } from "../app/appwrite/property";
import { FeaturedCard } from "./Card";
import Search from "./Search";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActionSheetRef } from "react-native-actions-sheet";
import NoResult from "./NoResult";

const FeaturedProperties = ({
  actionSheetRef,
}: {
  actionSheetRef: React.RefObject<ActionSheetRef>;
}) => {
  const router = useRouter();
  const { user } = useClerk();
  const [properties, setProperties] = useState<PropertyType[] | null>();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const insets = useSafeAreaInsets();

  const filters = {
    filter: searchParams.get("filter"),
    query: searchParams.get("query"),
    minimumPrice: searchParams.get("minimumPrice"),
    maximumPrice: searchParams.get("maximumPrice"),
    bathrooms: searchParams.get("bathrooms"),
    bedrooms: searchParams.get("bedrooms"),
  };
  const handlePropertyPress = (id: string) => {
    router.push(`/(root)/property/${id}`);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const properties = await getFilteredFeaturedProperties(
          { ...filters },
          4
        );

        setProperties(properties);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [
    filters.bathrooms,
    filters.bedrooms,
    filters.filter,
    filters.maximumPrice,
    filters.minimumPrice,
    filters.query,
  ]);

  return (
    <View style={{ paddingTop: insets.top }}>
      <View>
        <View className="px-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => router.push("/(root)/(tabs)/profile")}
              >
                <Image
                  source={{ uri: user?.imageUrl }}
                  className="h-12 w-12 rounded-full"
                />
              </TouchableOpacity>
              <View className="flex-col justify-center gap-1">
                <Text className="text-sm font-rubik text-gray-300">
                  Добро утро
                </Text>
                <Text className="font-rubik">{user?.firstName}</Text>
              </View>
            </View>
            <NotificationBell />
          </View>
          <Search actionSheetRef={actionSheetRef} />
          <View className="flex-row justify-between mb-4">
            <Text className="text-xl font-rubik-bold">Ние препоръчваме</Text>
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/explore")}
            >
              <Text className="text-lg font-rubik-bold text-primary-100">
                Виж всички
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        data={loading ? [] : properties}
        horizontal
        renderItem={({ item }) => {
          return (
            <FeaturedCard
              id={item.id}
              category={item.type}
              image={item.image}
              location={item.address}
              price={item.price.toString()}
              rating={item.rating}
              title={item.name}
              onPropertyPress={handlePropertyPress}
            />
          );
        }}
        ListEmptyComponent={() =>
          loading ? (
            <View className="flex-row gap-8">
              <ActivityIndicator className="w-[250px] h-[340px] justify-self-center bg-gray-300 rounded-2xl" />
              <ActivityIndicator className="w-[250px] h-[340px] justify-self-center bg-gray-300 rounded-2xl" />
            </View>
          ) : (
            <NoResult title={"Няма намерени имоти..."} />
          )
        }
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-8 px-6"
      />
      <View className="flex-col my-4">
        <View className="px-6 flex-row justify-between items-center">
          <Text className="text-xl font-rubik-bold">Представени имоти</Text>
          <TouchableOpacity
            onPress={() => router.push("/(root)/(tabs)/explore")}
          >
            <Text className="text-lg font-rubik-bold text-primary-100">
              Виж всички
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeaturedProperties;
