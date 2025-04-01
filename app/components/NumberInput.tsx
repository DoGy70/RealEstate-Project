import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { NumberInputProps } from "../lib/types";

const NumberInput = ({
  title,
  facility,
  handleFacilityIncrease,
  handleFacilityDecrease,
}: NumberInputProps) => {
  return (
    <View className="flex-row justify-between">
      <Text className="font-rubik text-black-300">{title}</Text>

      <View className="flex-row gap-3 items-center">
        <TouchableOpacity
          className="bg-primary-300 px-2 py-1 rounded-full items-center justify-center"
          onPress={handleFacilityDecrease}
        >
          <Text className="font-rubik-bold text-primary-100">-</Text>
        </TouchableOpacity>
        <TextInput
          value={facility}
          className="font-rubik"
          placeholder={facility}
        />
        <TouchableOpacity
          className="bg-primary-300 px-2 py-1 rounded-full items-center justify-center"
          onPress={handleFacilityIncrease}
        >
          <Text className="font-rubik-bold text-primary-100">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumberInput;
