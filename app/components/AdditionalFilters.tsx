import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import icons from "../constants/icons";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { categories } from "../constants/data";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import Title from "./Title";
import NumberInput from "./NumberInput";
import CustomButton from "./CustomButton";

const AdditionalFilters = ({
  actionSheetRef,
}: {
  actionSheetRef: React.RefObject<ActionSheetRef>;
}) => {
  const params = useSearchParams();
  const [filters, setFilters] = useState<{
    filter: string;
    maximumPrice: string;
    minimumPrice: string;
    bedrooms: string | number;
    bathrooms: string | number;
  }>({
    maximumPrice: params.get("maximumPrice") || "5000",
    minimumPrice: params.get("minimumPrice") || "0",
    filter: params.get("filter") || "All",
    bedrooms: params.get("bedrooms") || "",
    bathrooms: params.get("bathrooms") || "",
  });

  useEffect(() => {
    setFilters({ ...filters, filter: params.get("filter") || "All" });
  }, [params.get("filter")]);

  const handleSearchFilters = (item: { title: string; category: string }) => {
    if (item.category === filters.filter) {
      setFilters((oldFilters) => {
        return { ...oldFilters, filter: "All" };
      });
      return;
    }

    setFilters((oldFilters) => {
      return { ...oldFilters, filter: item.category };
    });
  };

  const handleMaximumPriceChange = (value: number) => {
    setFilters((oldFilters) => {
      return { ...oldFilters, maximumPrice: value.toString() };
    });
  };

  const handleMinimumPriceChange = (value: number) => {
    setFilters((oldFilters) => {
      return { ...oldFilters, minimumPrice: value.toString() };
    });
  };

  const handleBathroomsIncrease = () => {
    if (+filters.bathrooms === 5) {
      setFilters((oldFilters) => {
        return { ...oldFilters, bathrooms: "5" };
      });
    } else {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          bathrooms: (+oldFilters.bathrooms + 1).toString(),
        };
      });
    }
  };

  const handleBathroomsDecrease = () => {
    if (+filters.bathrooms === 0) {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          bathrooms: "0",
        };
      });
    } else {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          bathrooms: (+oldFilters.bathrooms - 1).toString(),
        };
      });
    }
  };

  const handleBedroomsIncrease = () => {
    if (+filters.bedrooms === 5) {
      setFilters((oldFilters) => {
        return { ...oldFilters, bedrooms: "5" };
      });
    } else {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          bedrooms: (+oldFilters.bedrooms + 1).toString(),
        };
      });
    }
  };

  const handleBedroomsDecrease = () => {
    if (+filters.bedrooms === 0) {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          bedrooms: "0",
        };
      });
    } else {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          bedrooms: (+oldFilters.bedrooms - 1).toString(),
        };
      });
    }
  };

  const handleApplyFilters = () => {
    const newFilters = {
      filter: filters.filter === "All" ? "" : filters.filter,
      bathrooms: filters.bathrooms,
      bedrooms: filters.bedrooms,
      maximumPrice: filters.maximumPrice === "5000" ? "" : filters.maximumPrice,
      minimumPrice: filters.minimumPrice === "0" ? "" : filters.minimumPrice,
    };

    actionSheetRef.current?.hide();
    router.setParams({ ...newFilters });
  };

  const handleResetFilters = () => {
    setFilters(() => {
      return {
        bathrooms: "",
        bedrooms: "",
        filter: "All",
        maximumPrice: "5000",
        minimumPrice: "0",
      };
    });
  };

  return (
    <ActionSheet containerStyle={{ height: "80%" }} ref={actionSheetRef}>
      <View className="px-6 py-6">
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity
            className="bg-primary-200 p-2 rounded-full"
            onPress={() => actionSheetRef.current?.hide()}
          >
            <Image source={icons.backArrow} className="size-6" />
          </TouchableOpacity>
          <Text className="font-rubik-medium">Филтри</Text>
          <TouchableOpacity onPress={handleResetFilters}>
            <Text className="font-rubik-medium text-primary-100">Reset</Text>
          </TouchableOpacity>
        </View>
        <View className="pb-2 pt-4">
          <Title title="Ценови Диапазон" />
          <View className="gap-3">
            <View>
              <Text className="font-rubik-medium">
                Максимална цена:{" "}
                <Text className="font-rubik-bold text-primary-100">
                  {filters.maximumPrice}лв.
                </Text>
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={5000}
                step={100}
                value={+filters.maximumPrice}
                onValueChange={(value) => handleMaximumPriceChange(value)}
              />
            </View>
            <View>
              <Text className="font-rubik-medium">
                Минимална цена:{" "}
                <Text className="font-rubik-bold text-primary-100">
                  {filters.minimumPrice}лв.
                </Text>
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={5000}
                value={+filters.minimumPrice}
                step={100}
                onValueChange={(value) => handleMinimumPriceChange(value)}
              />
            </View>
          </View>
        </View>
        <View className="py-2">
          <FlatList
            contentContainerClassName="gap-3"
            columnWrapperClassName="gap-3"
            numColumns={3}
            scrollEnabled={false}
            ListHeaderComponent={() => {
              return <Title title="Тип Имот" />;
            }}
            data={categories}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  className={`justify-center px-3 py-2 border border-gray-300 rounded-3xl ${
                    item.category === filters.filter
                      ? "bg-primary-100 text-white"
                      : "bg-primary-200"
                  }`}
                  onPress={() => {
                    handleSearchFilters(item);
                  }}
                >
                  <Text
                    className={`${
                      item.category === filters.filter
                        ? "text-white"
                        : "text-black-300"
                    }`}
                  >
                    {item.category}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View className="py-4 gap-3">
            <Title title="Детайли За Имота" />
            <NumberInput
              title="Бани"
              facility={filters.bathrooms}
              handleFacilityDecrease={handleBathroomsDecrease}
              handleFacilityIncrease={handleBathroomsIncrease}
            />
            <View className="border-b border-primary-200" />
            <NumberInput
              title="Спални"
              facility={filters.bedrooms}
              handleFacilityDecrease={handleBedroomsDecrease}
              handleFacilityIncrease={handleBedroomsIncrease}
            />
          </View>
        </View>
        <CustomButton title="Задай Филтри" onPress={handleApplyFilters} />
      </View>
    </ActionSheet>
  );
};

export default AdditionalFilters;
