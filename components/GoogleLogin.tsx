import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback } from "react";
import icons from "../constants/icons";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { addUser } from "@/appwrite/user";

const GoogleLogin = () => {
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp, authSessionResult } =
        await startSSOFlow({
          strategy: "oauth_google",
        });

      if (signUp?.createdUserId) {
        const newUser = {
          name: signUp.firstName!,
          email: signUp.emailAddress!,
          clerkId: signUp.createdUserId!,
        };
        const id = await addUser(newUser);

        if (!id) throw new Error("There was a problem creating the user.");
      }

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.dismissAll();
        router.replace("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <View className="gap-2 w-full items-center justify-center">
      <View className="flex flex-row items-center gap-2">
        <View className="flex-1 h-[1px] bg-black-200" />
        <Text className="font-rubik-medium">Или</Text>
        <View className="flex-1 h-[1px] bg-black-200"></View>
      </View>
      <TouchableOpacity
        className="flex-row gap-3 items-center justify-center w-full p-3 shadow-md shadow-neutral-400/70 bg-white border border-gray-200 rounded-full"
        onPress={onPress}
      >
        <Image source={icons.google} className="size-6" resizeMode="contain" />
        <Text className="font-rubik-bold">Продължи с Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;
