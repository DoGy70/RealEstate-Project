import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/app/constants/icons";
import { useGlobalContext } from "@/app/lib/useGlobalContext";
import DateTimePicker, {
  DateType,
  useDefaultClassNames,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import Rooms from "@/app/components/Room";
import ReactNativeModal from "react-native-modal";
import CustomButton from "@/app/components/CustomButton";
import { router } from "expo-router";

const Checkout = () => {
  const { property } = useGlobalContext();
  const [newStartDate, setNewStartDate] = useState<DateType>(
    new Date().getDate()
  );
  const [newEndDate, setNewEndDate] = useState<DateType>();
  const defaultClassNames = useDefaultStyles();
  const [success, setSuccess] = useState(false);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 px-6 py-4">
        <View className="flex-row w-full items-center mb-10">
          <TouchableOpacity className="items-center bg-white rounded-full px-1 py-1">
            <Image source={icons.backArrow} className="size-8" />
          </TouchableOpacity>
          <Text className="font-rubik-bold text-2xl ml-8">
            Booking Information
          </Text>
        </View>
        <View className="flex-col gap-5 items-center">
          <Image
            source={{ uri: property.image }}
            className="size-48 rounded-full"
          />
          <View className="gap-1">
            <View className="flex-row gap-3 justify-center">
              <Text className="font-rubik-bold text-xl">{property.name}</Text>
              <View className="flex-row gap-1 items-center">
                <Image source={icons.star} className="size-6" />
                <Text className="font-rubik-medium text-base">
                  {property.rating}
                </Text>
              </View>
            </View>
            <Text className="font-rubik text-black-300">
              {property.address}
            </Text>
          </View>
          <View className="flex-col bg-primary-200 w-full gap-5 px-6 py-6 rounded-xl">
            <View className="flex-row justify-between items-center">
              <Text className="font-rubik">Property Price</Text>
              <Text className="font-rubik-medium text-green-500 text-lg">
                {property.price} лв.
              </Text>
            </View>
            <View className="w-full h-0.5 bg-white" />
            <View className="flex-row justify-between items-center">
              <Text className="font-rubik">Agent Name</Text>
              <Text className="font-rubik-medium">
                {property.users?.name || "No name"}
              </Text>
            </View>
            <View className="w-full h-0.5 bg-white" />
            <View className="flex-row justify-between items-center">
              <Rooms
                icon={icons.bath}
                number={property.bathrooms}
                utility="baths"
              />
              <Rooms
                icon={icons.bed}
                number={property.bedrooms}
                utility="beds"
              />
              <Rooms icon={icons.area} number={property.area} utility="sqft" />
            </View>
          </View>
          <DateTimePicker
            mode="range"
            styles={{
              ...defaultClassNames,
              today: { borderColor: "blue", borderWidth: 1 },
              day: { color: "#FFFFFF" },
              selected: { backgroundColor: "blue", color: "#FFFFFF" },
            }}
            startDate={newStartDate}
            endDate={newEndDate}
            onChange={({ startDate, endDate }) => {
              if (startDate != newStartDate) {
                setNewStartDate(startDate);
              }

              if (endDate != newEndDate) {
                setNewEndDate(endDate);
              }
            }}
          />
        </View>
      </SafeAreaView>
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image
            source={icons.check}
            className="w-28 h-28 mt-5 bg-green-500 rounded-full"
          />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.replace("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default Checkout;
