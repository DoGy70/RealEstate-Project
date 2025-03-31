import React, { useCallback, useEffect } from "react";
import { Redirect, Stack } from "expo-router";

import { useClerk } from "@clerk/clerk-expo";
import { useGlobalContext } from "../lib/useGlobalContext";
import { getUser, updateUserPicture } from "../appwrite/appwrite";

const RootLayout = () => {
  const { user } = useClerk();
  const { user: appwriteUser, setUser, setFavorites } = useGlobalContext();

  if (!user) {
    <Redirect href="/" />;
  }

  const fetchUser = useCallback(async () => {
    try {
      const appwriteUser = await getUser(user?.id);

      if (!appwriteUser) throw new Error("Could not find user.");

      if (!appwriteUser.imageUrl) {
        await updateUserPicture(appwriteUser.id, user?.imageUrl);
        appwriteUser.imageUrl = user?.imageUrl;
      }

      setUser(appwriteUser);
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUser();
    setFavorites([...appwriteUser.favoriteProperties]);
  }, [fetchUser]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
