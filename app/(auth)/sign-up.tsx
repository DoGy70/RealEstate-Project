import { Image, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import images from "../constants/images";
import CustomTextInput from "../components/CustomTextInput";
import GoogleLogin from "../components/GoogleLogin";
import { ReactNativeModal } from "react-native-modal";
import icons from "../constants/icons";
import CustomButton from "../components/CustomButton";
import { addUser } from "../appwrite/user";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [error, setError] = useState("");
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "",
    code: "",
    error: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onNameChange = (name: string) => {
    setRegister({ ...register, name });
  };

  const onEmailChange = (email: string) => {
    setRegister({ ...register, email });
  };

  const onPasswordChange = (password: string) => {
    setRegister({ ...register, password });
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: register.email,
        password: register.password,
        firstName: register.name,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        if (
          err.errors[0].meta?.paramName == "email_address" &&
          err.errors[0].code == "form_param_format_invalid"
        ) {
          setError("Invalid email format.");
        } else {
          setError(err.errors[0].longMessage!);
        }
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (signUpAttempt.status === "complete") {
        const newUser = {
          name: register.name,
          email: register.email,
          clerkId: signUpAttempt.createdUserId!,
        };
        const id = await addUser(newUser);

        if (!id) throw new Error("There was an error creating the user.");

        setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setVerification({ ...verification, error: err.errors[0].longMessage! });
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
            <Text className="font-rubik-bold text-3xl text-center">
              Създай акаунт
            </Text>
            <View className="h-[2px] w-1/2 bg-primary-100"></View>
          </View>
          <View className="my-5">
            <View className="gap-5">
              <CustomTextInput
                value={register.email}
                onChangeText={onEmailChange}
                label="Имейл Адрес"
                placeholder="email@example.com"
              />
              <CustomTextInput
                value={register.name}
                onChangeText={onNameChange}
                label="Име"
                placeholder="John Doe"
              />
              <CustomTextInput
                value={register.password}
                onChangeText={onPasswordChange}
                label="Парола"
                placeholder="въведи своята парола"
                password
              />
            </View>
            {error && (
              <Text className="text-red-500 text-xs mt-1">{error}</Text>
            )}
          </View>
          <View className="flex flex-col items-center justify-center gap-2">
            <CustomButton title="Регистрирай се" onPress={onSignUpPress} />
            <GoogleLogin />
          </View>
          <View className="flex flex-row justify-center items-center">
            <Text className="font-rubik-medium text-gray-400">
              Вече имаш акаунт?{" "}
            </Text>
            <TouchableOpacity
              className="items-center"
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Text className="text-primary-100 font-rubik-medium text-center">
                Влез в него
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="font-rubik-extrabold text-2xl mb-2">
            Верификация
          </Text>
          <Text className="font-rubik mb-5">
            Изпратихме код за верификация до {register.email}.
          </Text>
          <CustomTextInput
            label={"Код"}
            placeholder={"12345"}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) => setVerification({ ...verification, code })}
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Верифицирай"
            onPress={onVerifyPress}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="flex flex-col min-h-[300px] bg-white rounded-2xl items-center py-9 px-7">
          <View className="bg-green-500 rounded-full">
            <Image
              source={icons.check}
              resizeMode="contain"
              className="h-32 w-32"
            />
          </View>
          <Text className="text-3xl font-rubik-bold text-center">
            Верифициран
          </Text>
          <Text className="text-base text-gray-400 font-rubik text-center mt-2">
            Успешно верифицира своя акаунт.
          </Text>
          <CustomButton
            title="Начало"
            onPress={() => {
              setRegister({ email: "", password: "", name: "" });
              setVerification({ state: "", code: "", error: "" });
              setShowSuccessModal(false);
              router.replace("/(root)/(tabs)");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
}
