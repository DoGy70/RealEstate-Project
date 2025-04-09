import { useCallback, useMemo, useRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import AllProperties from "@/app/components/AllProperties";
import FeaturedProperties from "@/app/components/FeaturedProperties";
import Filters from "@/app/components/Filters";
import { FlatList, View } from "react-native";
import AdditionalFilters from "@/app/components/AdditionalFilters";

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
