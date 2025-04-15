import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import * as Fonts from "expo-font";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { GlobalContext } from "./context/Context";
import { AppwriteUser, PropertyType } from "../lib/types";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  const [user, setUser] = useState<AppwriteUser>({
    id: "",
    name: "",
    email: "",
    clerkId: "",
    favoriteProperties: [],
  });
  const [favorites, setFavorites] = useState<string[]>(
    user.favoriteProperties ?? [""]
  );
  const [property, setProperty] = useState<PropertyType>({
    address: "",
    area: 0,
    bathrooms: 0,
    bedrooms: 0,
    description: "",
    facilities: ["Laundry"],
    featured: false,
    galleries: [],
    geolocation: "",
    id: "",
    image: "",
    name: "",
    price: 1,
    rating: 1,
    reviews: [],
    type: "",
    users: [],
  });

  if (!publishableKey) {
    throw new Error("Missing Publishable key. Please set it");
  }

  const loadFonts = async () => {
    await Fonts.loadAsync({
      Rubik: require("../assets/fonts/Rubik-Regular.ttf"),
      "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
      "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
      "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
      "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
      "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    });
  };

  useEffect(() => {
    async function prepareFonts() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.error(e);
      }
    }

    prepareFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex flex-1">
        <Text>Could not load fonts</Text>
      </View>
    );
  }

  return (
    <GlobalContext.Provider
      value={{ user, setUser, favorites, setFavorites, property, setProperty }}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkProvider>
    </GlobalContext.Provider>
  );
}
