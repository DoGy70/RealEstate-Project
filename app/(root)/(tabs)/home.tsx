import AllProperties from "@/app/components/AllProperties";
import FeaturedProperties from "@/app/components/FeaturedProperties";
import Filters from "@/app/components/Filters";
import seed from "@/app/lib/seed";
import { useGlobalContext } from "@/app/lib/useGlobalContext";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const { user } = useGlobalContext();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FeaturedProperties />
      {/* <Button title="seed" onPress={seed} /> */}
      <Filters />
      <AllProperties />
    </ScrollView>
  );
}
