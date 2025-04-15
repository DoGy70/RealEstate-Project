import { Text } from "react-native";
import React from "react";

const Title = ({ title }: { title: string }) => {
  return <Text className="font-rubik-bold text-lg">{title}</Text>;
};

export default Title;
