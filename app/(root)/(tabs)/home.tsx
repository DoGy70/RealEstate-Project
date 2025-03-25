import { getAllProperties } from "@/app/appwrite/appwrite";
import Card, { FeaturedCard } from "@/app/components/Card";
import Filters from "@/app/components/Filters";
import Loading from "@/app/components/Loading";
import NotificationBell from "@/app/components/NotificationBell";
import Search from "@/app/components/Search";
import { Properties } from "@/app/lib/types";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SkeletonContent from "react-native-skeleton-content";

export default function HomeScreen() {
  const { user } = useClerk();
  const [properties, setProperties] = useState<Properties[]>();
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const featuredProperties = properties?.filter(
    (property) => property.featured === true
  );

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const properties = await getAllProperties();

        if (!properties)
          throw new Error("There was a problem fetching the properties");

        setProperties(properties);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
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
                      Good Morning
                    </Text>
                    <Text className="font-rubik">{user?.firstName}</Text>
                  </View>
                </View>
                <NotificationBell />
              </View>
              <Search />
              <View className="flex-row justify-between mb-4">
                <Text className="text-xl font-rubik-bold">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-lg font-rubik-bold text-primary-100">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={featuredProperties?.slice(0, 4)}
              horizontal
              renderItem={({ item }) => {
                return (
                  <FeaturedCard
                    category={item.type}
                    image={item.image}
                    location={item.address}
                    price={item.price.toString()}
                    rating={item.rating}
                    title={item.name}
                  />
                );
              }}
              ListEmptyComponent={() =>
                loading ? (
                  <ActivityIndicator />
                ) : (
                  <View>
                    <Text>No items found...</Text>
                  </View>
                )
              }
              keyExtractor={(item) => item.name}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-8 ml-6"
            />
            <View className="flex-col my-4">
              <View className="px-6 flex-row justify-between items-center">
                <Text className="text-xl font-rubik-bold">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text-primary-100">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters filter={filter} setFilter={setFilter} />
            </View>
          </View>
        );
      }}
      data={properties?.slice(0, 8)}
      numColumns={2}
      renderItem={({ item }) => (
        <Card
          title={item.name}
          category={item.type}
          image={item.image}
          location={item.address}
          price={item.price.toString()}
          rating={item.rating}
        />
      )}
      ListEmptyComponent={() =>
        loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Text>No properties found...</Text>
          </View>
        )
      }
      columnWrapperClassName="gap-4 justify-center"
      showsVerticalScrollIndicator={false}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    />
  );
}
