import { useRouter } from "expo-router";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { settings } from "@/app/constants/data";
import { useClerk } from "@clerk/clerk-expo";
import icons from "@/app/constants/icons";
import NotificationBell from "@/app/components/NotificationBell";
import { useGlobalContext } from "@/app/lib/useGlobalContext";

export default function ProfileScreen() {
  const { user, signOut } = useClerk();
  const { setUser } = useGlobalContext();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSignout = async () => {
    try {
      await signOut();
      setUser({ id: "", name: "", email: "", clerkId: "", imageUrl: "" });
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
          <View>
            <View className="flex-row justify-between items-center">
              <Text className="font-rubik-bold text-xl">Profile</Text>
              <NotificationBell />
            </View>
            <View className="flex-col items-center mt-6 gap-3 pb-6 border-b border-gray-200">
              <View className="relative">
                <Image
                  source={{ uri: user?.imageUrl }}
                  className="w-32 h-32 rounded-full"
                />
                <Image
                  source={icons.edit}
                  className="w-8 h-8 absolute right-0 bottom-0.5"
                />
              </View>
              <Text className="font-rubik-bold text-2xl">
                {user?.firstName}
              </Text>
            </View>
          </View>
        );
      }}
      data={settings}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            className={`flex flex-row justify-between items-center ${
              item.title === "Payments" ? "border-b border-gray-200 pb-6" : ""
            } ${item.title === "Profile" ? "pt-1" : ""} mt-5`}
          >
            <View className="flex flex-row items-center gap-3">
              <Image source={item.icon} className="size-8" />
              <Text className="font-rubik-bold">{item.title}</Text>
            </View>
            <Image source={icons.rightArrow} className="size-5" />
          </TouchableOpacity>
        );
      }}
      ListFooterComponent={() => {
        return (
          <TouchableOpacity
            className="flex flex-row gap-3 items-center mt-5"
            onPress={handleSignout}
          >
            <Image source={icons.logout} className="size-8" />
            <Text className="text-red-500 font-rubik-bold">Logout</Text>
          </TouchableOpacity>
        );
      }}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="px-6"
    />
  );
}
