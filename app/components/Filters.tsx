import { Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { categories } from "../constants/data";
import { router, useLocalSearchParams } from "expo-router";

const Filters = () => {
  const searchParams = useLocalSearchParams<{ filter?: string }>();
  const [filter, setFilter] = useState(searchParams.filter || "All");

  const handleSearchFilters = (item: { title: string; category: string }) => {
    if (item.category === filter || item.category === "All") {
      setFilter("");
      router.setParams({ filter: "" });
      return;
    }

    setFilter(item.title);
    router.setParams({ filter: item.category });
  };

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            className={`justify-center mt-2 px-5 py-2 border border-gray-300 rounded-3xl ${
              item.category === filter
                ? "bg-primary-100 text-white"
                : "bg-primary-200"
            }`}
            onPress={(e) => {
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
      contentContainerClassName="gap-2"
      className="px-6"
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Filters;
