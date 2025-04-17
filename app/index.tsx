import { Image, Text, TouchableOpacity, View } from "react-native";
import "./globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Redirect, router } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import "react-native-reanimated";
import "react-native-gesture-handler";

export default function Index() {
  const { user } = useClerk();
  if (user) return <Redirect href="/(root)/(tabs)/home" />;

  return (
    <SafeAreaView className="flex flex-1 px-6 items-center bg-gray-50">
      <Image
        source={images.onboarding}
        resizeMode="contain"
        className="h-[70%] w-full"
      />
      <View className="flex flex-col items-center gap-y-4">
        <Text className="uppercase font-rubik color-black-300">
          Добре Дошли В Scoutr
        </Text>
        <Text className="font-rubik-bold text-2xl text-center uppercase">
          Нека Ви доближим до{" "}
          <Text className="fontr-rubik-bold text-primary-100 text-2xl uppercase">
            Вашия Идеален Дом
          </Text>
        </Text>
        <View className="flex flex-col items-center gap-y-2 w-full ">
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-up")}
            className="bg-primary-100 px-24 py-3 rounded-full"
          >
            <Text className="text-white font-rubik-bold">Регистрация</Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center gap-2">
            <View className="flex-1 h-[1px] bg-black-200" />
            <Text className="font-rubik-medium">Или</Text>
            <View className="flex-1 h-[1px] bg-black-200"></View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-in")}
            className="bg-white  px-32 py-3 rounded-full border border-gray-300"
          >
            <Text className="font-rubik-bold">Вход</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
