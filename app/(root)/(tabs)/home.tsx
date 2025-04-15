import { useCallback, useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import AllProperties from "@/components/AllProperties";
import FeaturedProperties from "@/components/FeaturedProperties";
import Filters from "@/components/Filters";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AdditionalFilters from "@/components/AdditionalFilters";
import seed from "@/lib/seed";

export default function HomeScreen() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <FeaturedProperties actionSheetRef={actionSheetRef} />
          <TouchableOpacity
            className="bg-green-100 ml-3"
            onPress={() => seed()}
          >
            <Text>Seed</Text>
          </TouchableOpacity>
          <Filters />
        </View>
      }
      data={["asd"]}
      renderItem={useCallback(() => {
        return <AllProperties />;
      }, [])}
      ListFooterComponent={
        <AdditionalFilters actionSheetRef={actionSheetRef} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
