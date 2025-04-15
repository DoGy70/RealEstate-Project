import { View, Image } from "react-native";
import React from "react";
import icons from "../constants/icons";

const NotificationBell = () => {
  return (
    <View className="relative">
      <Image source={icons.bell} className="size-6" />
      <View className="bg-primary-100 w-2 h-2 rounded-full absolute top-0.5 right-0.5" />
    </View>
  );
};

export default NotificationBell;
