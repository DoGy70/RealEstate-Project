import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalContext } from "../lib/useGlobalContext";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import ReactNativeModal from "react-native-modal";
import icons from "../constants/icons";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const Checkout = ({ price }: { price: number }) => {
  const insets = useSafeAreaInsets();
  const { user } = useGlobalContext();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const openPaymentSheet = async () => {
    try {
      await initializePaymentSheet();
      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === "Canceled") return;

        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "RealEstate, Inc.",
      intentConfiguration: {
        mode: {
          amount: price * 100,
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
                amount: price,
                paymentMethodId: paymentMethod.id,
              }),
            });

            const { paymentIntent, customer } = await response.json();

            if (paymentIntent?.client_secret) {
              console.log(paymentMethod.id);
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
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    >
      <View>
        <View
          className="flex-row px-6 py-6 justify-between border-t border-l border-r border-primary-200 rounded-t-3xl items-center"
          style={{ paddingBottom: insets.bottom }}
        >
          <View className="flex-col gap-2">
            <Text className="uppercase text-sm font-rubik-medium text-black-300">
              Price
            </Text>
            <Text className="text-3xl text-primary-100 font-rubik-bold">
              ${price}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-primary-100 py-4 px-12 rounded-full shadow shadow-black-100"
            onPress={openPaymentSheet}
          >
            <Text className="font-rubik text-white">Booking Now</Text>
          </TouchableOpacity>
        </View>
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
      </View>
    </StripeProvider>
  );
};

export default Checkout;
