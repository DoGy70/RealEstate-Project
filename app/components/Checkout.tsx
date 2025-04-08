import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../lib/useGlobalContext";
import { router } from "expo-router";
import { PropertyType } from "../lib/types";

const Checkout = ({ property }: { property: PropertyType }) => {
  const insets = useSafeAreaInsets();
  const { setProperty } = useGlobalContext();

  return (
    <View>
      <View
        className="flex-row px-6 py-6 justify-between border-t border-l border-r border-primary-200 rounded-t-3xl items-center"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-col gap-2">
          <Text className="uppercase text-sm font-rubik-medium text-black-300">
            Цена
          </Text>
          <Text className="text-3xl text-primary-100 font-rubik-bold">
            {property.price}лв.
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary-100 py-6 rounded-full shadow shadow-black-100 w-3/5 items-center"
          onPress={() => {
            router.push("/(root)/property/checkout");
            setProperty(property);
          }}
        >
          <Text className="font-rubik-bold text-white tracking-wide ">
            Резервирай Сега
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;
