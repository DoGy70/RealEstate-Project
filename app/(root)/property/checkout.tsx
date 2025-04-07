import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
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
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

const Checkout = () => {
  const { property, user } = useGlobalContext();
  const today = new Date();
  const [newStartDate, setNewStartDate] = useState<DateType>(today);
  const [newEndDate, setNewEndDate] = useState<DateType>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const openPaymentSheet = async () => {
    try {
      await initializePaymentSheet();
      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === "Canceled") return;

        Alert.alert(`Error code: ${error.code}`, error.message);
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "RealEstate, Inc.",
      intentConfiguration: {
        mode: {
          amount: property.price * 10,
          currencyCode: "bgn",
        },
        confirmHandler: async (
          paymentMethod,
          shouldSavePaymentMethod,
          intentCreationCallback
        ) => {
          try {
            const response = await fetch("/(api)/(stripe)/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                amount: property.price,
                paymentMethodId: paymentMethod.id,
              }),
            });

            const { paymentIntent, customer } = await response.json();

            if (paymentIntent?.client_secret) {
              const response = await fetch("/(api)/(stripe)/pay", {
                method: "POST",
                headers: {
                  ContentType: "application/json",
                },
                body: JSON.stringify({
                  payment_method_id: paymentMethod.id,
                  payment_intent_id: paymentIntent.id,
                  customer_id: customer,
                  client_secret: paymentIntent.client_secret,
                }),
              });

              const { result } = await response.json();

              if (result.client_secret) {
                intentCreationCallback({
                  clientSecret: result.client_secret,
                });
              }
            }
          } catch (error) {
            console.error(error);
          }
        },
      },
      returnURL: "realestate://home",
    });

    if (!error) {
    }
  };

  return (
    <ScrollView className="mb-15">
      <SafeAreaView className="flex-1 px-6 py-4">
        <View className="flex-row w-full items-center">
          <TouchableOpacity
            className="items-center bg-primary-200 rounded-full px-1 py-1"
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className="size-6" />
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
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              gap: 5,
              padding: 15,
              shadowColor: "black",
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.15,
              shadowRadius: 15,
            }}
            styles={{
              today_label: {
                color: "#0061FF",
              },
              day_label: {
                fontFamily: "Rubik",
              },
              month_label: {
                fontFamily: "Rubik",
              },
              year_label: {
                fontFamily: "Rubik",
              },
              today: {
                backgroundColor: "white",
                borderColor: "#0061FF",
                borderWidth: 0.5,
                borderRadius: 360,
              },
              day: { color: "#000000" },
              selected: {
                backgroundColor: "#0061FF",
                borderRadius: 5,
                color: "#FFFFFFF",
              },
              range_middle: {
                backgroundColor: "#0061FF1A",
              },
              selected_label: {
                color: "white",
              },
              button_next: { backgroundColor: "black", borderRadius: 360 },
              button_prev: { backgroundColor: "black", borderRadius: 360 },
            }}
            startDate={newStartDate}
            endDate={newEndDate}
            minDate={today}
            onChange={({ startDate, endDate }) => {
              if (startDate != newStartDate) {
                setNewStartDate(startDate);
              }

              if (endDate != newEndDate) {
                setNewEndDate(endDate);
              }
            }}
          />
          <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_API_KEY!}
          >
            <CustomButton
              title="Book Now"
              className="mt-2"
              onPress={openPaymentSheet}
            />
          </StripeProvider>
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
