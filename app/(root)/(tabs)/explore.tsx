import { getFilteredProperties } from "@/app/appwrite/property";
import Filters from "@/app/components/Filters";
import Property from "@/app/components/Property";
import Search from "@/app/components/Search";
import icons from "@/app/constants/icons";
import { PropertyType } from "@/app/lib/types";
import { useClerk } from "@clerk/clerk-expo";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AdditionalFilters from "@/app/components/AdditionalFilters";
import { ActionSheetRef } from "react-native-actions-sheet";
import NoResult from "@/app/components/NoResult";
import ExploreMap from "@/app/components/ExploreMap";

const Explore = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useClerk();
  const searchParams = useSearchParams();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const filters = {
    filter: searchParams.get("filter"),
    query: searchParams.get("query"),
    minimumPrice: searchParams.get("minimumPrice"),
    maximumPrice: searchParams.get("maximumPrice"),
    bathrooms: searchParams.get("bathrooms"),
    bedrooms: searchParams.get("bedrooms"),
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const properties = await getFilteredProperties({ ...filters });

        if (!properties) {
          setProperties([]);
          return;
        }

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
    <GestureHandlerRootView className="">
      <View style={{ paddingTop: insets.top }} className="flex-1">
        <View className="flex-col gap-3">
          <View className="px-6">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                className="px-2 py-2 bg-primary-200 rounded-full items-center"
                onPress={() => router.back()}
              >
                <Image source={icons.backArrow} className="size-6" />
              </TouchableOpacity>
              <Text className="font-rubik-bold">Search Your Ideal Home</Text>
              <TouchableOpacity
                onPress={() => router.push("/(root)/(tabs)/profile")}
              >
                <Image
                  source={{ uri: user?.imageUrl }}
                  className="size-8 rounded-full"
                />
              </TouchableOpacity>
            </View>
            <Search actionSheetRef={actionSheetRef} />
          </View>
          <Filters />
        </View>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <Text className="font-rubik-bold text-xl">
                Found {properties.length} Apartment
                {properties.length === 1 ? "" : "s"}
              </Text>
            );
          }}
          data={properties}
          renderItem={({ item }) => {
            return (
              <Property
                id={item.id}
                image={item.image}
                address={item.address}
                name={item.name}
                price={item.price}
                rating={item.rating}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          className="px-6"
          contentContainerClassName="gap-3"
          ListEmptyComponent={() =>
            loading ? (
              <ActivityIndicator />
            ) : (
              <NoResult title="Няма намерени имоти..." />
            )
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View></View>}
        />
        <View className="items-center">
          <TouchableOpacity
            className="absolute bottom-10 bg-black-100 flex-row px-4 py-3 items-center gap-3 rounded-full"
            onPress={() => bottomSheetRef.current?.expand()}
          >
            <Text className="font-rubik text-white">Map</Text>
            <Ionicons name="map" color="white" size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        snapPoints={["80%"]}
        index={-1}
        enablePanDownToClose
        ref={bottomSheetRef}
      >
        <BottomSheetView className="flex-1 ">
          <ExploreMap properties={properties} />
        </BottomSheetView>
      </BottomSheet>
      <AdditionalFilters actionSheetRef={actionSheetRef} />
    </GestureHandlerRootView>
  );
};

export default Explore;
