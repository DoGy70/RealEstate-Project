import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { categories } from "../constants/data";
import { FiltersProps } from "../lib/types";

const Filters = ({ filter, setFilter }: FiltersProps) => {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            className={`justify-center mt-2 px-5 py-2 border border-gray-300 rounded-3xl ${
              item.title === filter
                ? "bg-primary-100 text-white"
                : "bg-primary-200"
            }`}
            onPress={() => {
              if (item.title === filter) {
                setFilter("All");
                return;
              }

              setFilter(item.title);
            }}
          >
            <Text
              className={`${
                item.title === filter ? "text-white" : "text-black-300"
              }`}
            >
              {item.title}
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
