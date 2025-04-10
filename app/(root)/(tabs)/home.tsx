import { useCallback, useMemo, useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import AllProperties from "@/app/components/AllProperties";
import FeaturedProperties from "@/app/components/FeaturedProperties";
import Filters from "@/app/components/Filters";
import { FlatList, Pressable, Text, View } from "react-native";
import AdditionalFilters from "@/app/components/AdditionalFilters";
import seed from "@/app/lib/seed";

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
