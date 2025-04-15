import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import { CustomTextInputProps } from "../lib/types";

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  additionalClasses,
  placeholder,
  keyboardType,
  password,
}: CustomTextInputProps) => {
  return (
    <View className="flex flex-col gap-2">
      <Text className="font-rubik-light text-gray-600">{label || value}</Text>
      <TextInput
        autoCapitalize="none"
        className={`px-2 py-3 rounded-xl border border-gray-200 bg-gray-100 placeholder:text-gray-400 ${additionalClasses}`}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={password}
      />
    </View>
  );
};

export default CustomTextInput;
