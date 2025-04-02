import { View, Text, Image, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import React from "react";
import Title from "./Title";
import icons from "../constants/icons";

const Agent = ({ users }: { users: any }) => {
  const handlePhoneButton = () => {
    Linking.openURL("tel:+359885453051");
  };

  return (
    <View className="gap-3">
      <Title title="Agent" />
      <View className="flex flex-row items-center justify-between">
        <View className="flex-row items-center gap-5">
          <Image
            source={{ uri: users?.imageUrl }}
            className="size-16 rounded-full"
          />
          <View className="flex flex-col gap-1">
            <Text className="font-rubik-bold text-base">{users?.name}</Text>
            <Text className="font-rubik text-black-300 text-sm">Owner</Text>
          </View>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <Image source={icons.chat} className="size-8" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePhoneButton}>
            <Image source={icons.phone} className="size-8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Agent;
