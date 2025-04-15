import { useCallback, useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import AllProperties from "@/components/AllProperties";
import FeaturedProperties from "@/components/FeaturedProperties";
import Filters from "@/components/Filters";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AdditionalFilters from "@/components/AdditionalFilters";

export default function HomeScreen() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <FeaturedProperties actionSheetRef={actionSheetRef} />

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
