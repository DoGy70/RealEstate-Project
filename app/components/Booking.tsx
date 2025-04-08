import { View, Text, Image } from "react-native";
import React from "react";
import { BookingType } from "../lib/types";
import icons from "../constants/icons";

const Booking = (booking: BookingType) => {
  return (
    <View className="flex-col px-6 py-6 bg-white rounded-lg gap-4">
      <View className="flex-row gap-3 items-center">
        <Image
          source={{ uri: booking.property.image }}
          className="size-32 rounded-lg"
        />
        <View className="flex-col gap-5">
          <Text className="font-rubik-bold">{booking.property.name}</Text>
          <View className="flex-row items-center gap-2">
            <Image source={icons.location} className="size-8" />
            <Text className="font-rubik text-xs w-2/3 text-black-300">
              {booking.property.address}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-col bg-primary-300 rounded-lg px-4 py-4">
        <View className="flex-row justify-between items-cente mb-4">
          <Text className="font-rubik text-black-200 text-sm">
            Дата на резервиране
          </Text>
          <Text className="font-rubik">
            {new Date(booking.dateBooked).toLocaleDateString()}
          </Text>
        </View>
        <View className="h-0.5 w-full bg-white" />
        <View className="flex-row justify-between items-cente my-4">
          <Text className="font-rubik text-black-200 text-sm">Агент</Text>
          <Text className="font-rubik">
            {booking.property.users?.name || "Няма име"}
          </Text>
        </View>
        <View className="h-0.5 w-full bg-white" />
        <View className="flex-row justify-between items-cente my-4">
          <Text className="font-rubik text-black-200 text-sm">
            Дата на настаняване
          </Text>
          <Text className="font-rubik">
            {new Date(booking.startDate).toLocaleDateString()}
          </Text>
        </View>
        <View className="h-0.5 w-full bg-white" />
        <View className="flex-row justify-between items-cente my-4">
          <Text className="font-rubik text-black-200 text-sm">
            Дата на заминаване
          </Text>
          <Text className="font-rubik">
            {new Date(booking.endDate).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row justify-between items-cente mt-4">
          <Text className="font-rubik text-black-200 text-sm">Цена</Text>
          <Text className="font-rubik-bold text-green-500">
            {booking.price}лв.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Booking;
