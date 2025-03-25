import { Image, Text, View } from "react-native";
import "./globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/app/constants/images";
import { Link, Redirect } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";

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
      <View className="flex flex-col items-center gap-y-4 ">
        <Text className="uppercase font-rubik color-black-300">
          Welcome To Real Scout
        </Text>
        <Text className="font-rubik-medium text-3xl text-center">
          Let's Get You Closer To{" "}
          <Text className="text-primary-100">Your Ideal Home</Text>
        </Text>
        <View className="flex flex-col items-center gap-y-2 w-full">
          <Link
            href={"/(auth)/sign-up"}
            className="bg-primary-100 px-32 py-3 rounded-full"
          >
            <Text className="text-white font-rubik-medium">Sign Up</Text>
          </Link>
          <View className="flex flex-row items-center gap-2">
            <View className="flex-1 h-[1px] bg-black-200" />
            <Text className="font-rubik-medium">Or</Text>
            <View className="flex-1 h-[1px] bg-black-200"></View>
          </View>
          <Link
            href={"/(auth)/sign-in"}
            className="bg-white px-32 py-3 rounded-full border border-gray-300"
          >
            <Text className="font-rubik-medium">Sign In</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
