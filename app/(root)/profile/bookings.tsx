import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookingType } from "@/app/lib/types";
import { getBookingsByUserId } from "@/app/appwrite/booking";
import { useGlobalContext } from "@/app/lib/useGlobalContext";
import NoResult from "@/app/components/NoResult";
import Booking from "@/app/components/Booking";
import icons from "@/app/constants/icons";
import { router } from "expo-router";

const BookingsScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useGlobalContext();
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const newBookings = await getBookingsByUserId(user.id);

      if (newBookings) setBookings(newBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <FlatList
      data={bookings}
      ListHeaderComponent={() => {
        return (
          <View className="flex-row gap-8 items-center mb-8">
            <TouchableOpacity
              className="px-2 py-2 rounded-full bg-primary-200"
              onPress={() => router.back()}
            >
              <Image source={icons.backArrow} className="size-6" />
            </TouchableOpacity>
            <Text className="font-rubik-bold text-2xl">Вашите резервации</Text>
          </View>
        );
      }}
      ListEmptyComponent={() =>
        loading ? <ActivityIndicator /> : <NoResult />
      }
      renderItem={({ item }: { item: BookingType }) => {
        return <Booking {...item} />;
      }}
      className="px-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    />
  );
};

export default BookingsScreen;
