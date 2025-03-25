import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "../constants/icons";

const Search = () => {
  return (
    <View className="my-5 px-3 py-4 flex-row justify-between bg-gray-200 rounded-lg">
      <View className=" flex-1 flex-row justify-start z-50">
        <Image source={icons.search} className="size-6" />
        <TextInput
          placeholder="Search something"
          className="flex-1 ml-2 text-sm font-rubik text-black-300 placeholder:text-black-300"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-6" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
