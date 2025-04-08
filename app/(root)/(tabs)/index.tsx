import { useRef } from "react";
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
      ListHeaderComponent={() => {
        return (
          <View>
            <FeaturedProperties actionSheetRef={actionSheetRef} />
            <Filters />
          </View>
        );
      }}
      data={["asd"]}
      renderItem={() => {
        return <AllProperties />;
      }}
      ListFooterComponent={() => {
        return <AdditionalFilters actionSheetRef={actionSheetRef} />;
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
