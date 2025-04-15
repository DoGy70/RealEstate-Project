import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { PropertyType } from "../lib/types";
import { useSearchParams } from "expo-router/build/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFilteredProperties } from "@/appwrite/property";
import Card from "./Card";
import NoResult from "./NoResult";

const AllProperties = () => {
  const [properties, setProperties] = useState<PropertyType[] | null>();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
        const properties = await getFilteredProperties({ ...filters }, 8);

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
    <View>
      <FlatList
        data={loading ? [] : properties?.slice(0, 8)}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.name}
            category={item.type}
            image={item.image}
            location={item.address}
            price={item.price.toString()}
            rating={item.rating}
            onPropertyPress={handlePropertyPress}
          />
        )}
        ListEmptyComponent={() =>
          loading ? (
            <View className="flex-1 flex-row justify-center grid col-span-2 gap-x-4 mx-5 h-[250px]">
              <ActivityIndicator className="px-3 py-3 mb-4 bg-white rounded-lg w-1/2 " />
              <ActivityIndicator className="px-3 py-3 mb-4 bg-white rounded-lg w-1/2" />
            </View>
          ) : (
            <NoResult title="Няма намерени имоти..." />
          )
        }
        columnWrapperClassName="gap-4 justify-center"
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: insets.bottom,
        }}
      />
    </View>
  );
};

export default AllProperties;
