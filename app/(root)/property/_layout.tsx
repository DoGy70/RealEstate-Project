import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PropertyLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PropertyLayout;
