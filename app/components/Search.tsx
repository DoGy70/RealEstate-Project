import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { router, useLocalSearchParams } from "expo-router";
import { ActionSheetRef } from "react-native-actions-sheet";
import Title from "./Title";

const Search = ({
  actionSheetRef,
}: {
  actionSheetRef: React.RefObject<ActionSheetRef>;
}) => {
  const searchParams = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(searchParams.query || "");
  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 1000);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="my-5 px-3 py-4 flex-row justify-between bg-gray-200 rounded-lg">
      <View className=" flex-1 flex-row">
        <Image source={icons.search} className="size-6" />
        <TextInput
          className="flex-1 ml-2 font-rubik text-black-300 placeholder:text-black-300"
          placeholder="Search something"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity onPress={() => actionSheetRef?.current?.show()}>
        <Image source={icons.filter} className="size-6" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
