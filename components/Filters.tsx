import { Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { categories } from "../constants/data";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

const Filters = () => {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "Всички");

  useEffect(() => {
    setFilter(searchParams.get("filter") || "Всички");
  }, [searchParams.get("filter")]);

  const handleSearchFilters = (item: { title: string; category: string }) => {
    if (item.category === filter || item.category === "Всички") {
      setFilter("Всички");
      router.setParams({ filter: "" });
      return;
    }

    setFilter(item.category);
    router.setParams({ filter: item.category });
  };

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            className={`justify-center px-5 py-3 border border-gray-300 rounded-3xl ${
              item.category === filter
                ? "bg-primary-100 text-white"
                : "bg-primary-200"
            }`}
            onPress={() => {
              handleSearchFilters(item);
            }}
          >
            <Text
              className={`${
                item.category === filter ? "text-white" : "text-black-300"
              }`}
            >
              {item.category}
            </Text>
          </TouchableOpacity>
        );
      }}
      horizontal
      contentContainerClassName="gap-2 px-6"
      className="mb-5"
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
    />
  );
};

export default Filters;
