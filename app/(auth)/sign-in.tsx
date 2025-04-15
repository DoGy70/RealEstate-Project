import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "../../components/CustomTextInput";
import images from "../../constants/images";
import GoogleLogin from "../../components/GoogleLogin";
import CustomButton from "../../components/CustomButton";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onEmailChange = (email: string) => {
    setLogin({ ...login, email });
  };

  const onPasswordChange = (password: string) => {
    setLogin({ ...login, password });
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: login.email,
        password: login.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors[0].message);
      }

      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 bg-primary-200">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="flex flex-col items-center justify-center gap-2">
          <Image
            source={images.icon}
            resizeMode="contain"
            className="w-24 h-24 rounded-full"
          />
          <View className="justify-center items-center gap-1">
            <Text className="text-2xl font-rubik-bold">
              Real<Text className="text-primary-100">Scout</Text>
            </Text>
            <Text className="font-rubik-light text-neutral-500">
              Намери мечтания си дом
            </Text>
          </View>
        </View>
        <View className="flex-1 mt-10 px-5 py-8 gap-5 shadow shadow-slate-200 bg-white rounded-xl">
          <View className="flex flex-col justify-center items-center gap-2">
            <Text className="font-rubik-bold text-2xl text-center">
              Влез в акаунта си
            </Text>
            <View className="h-[2px] w-1/2 bg-primary-100"></View>
          </View>
          <View className="my-5">
            <View className="gap-5">
              <CustomTextInput
                value={login.email}
                onChangeText={onEmailChange}
                label="Имейл"
                placeholder="email@example.com"
              />
              <CustomTextInput
                value={login.password}
                onChangeText={onPasswordChange}
                label="Парола"
                placeholder="въведи своята парола"
                password
              />
            </View>
            {error && (
              <Text className="text-xs text-red-500 mt-2">{error}</Text>
            )}
          </View>
          <View className="flex flex-col items-center justify-center gap-2">
            <CustomButton title="Влез" onPress={onSignInPress} />
            <GoogleLogin />
          </View>
          <View className="flex flex-row justify-center">
            <Text className="font-rubik-medium text-gray-400">
              Нямаш акаунт?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
              <Text className="text-primary-100 font-rubik-medium">
                Създай сега
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
