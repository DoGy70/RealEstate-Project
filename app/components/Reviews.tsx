import { View, Text, Image } from "react-native";
import React from "react";
import icons from "../constants/icons";
import Swiper from "react-native-swiper";
import { ReviewsProps, ReviewType } from "../lib/types";
import Review from "./Review";

const Reviews = ({ rating, reviewNum, reviews }: ReviewsProps) => {
  return (
    <View className="gap-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-3">
          <Image source={icons.star} className="size-6" resizeMode="cover" />
          <View className="gap-2 flex-row">
            <Text className="font-rubik-bold text-xl text-center">
              {rating}
            </Text>
            <Text className="font-rubik-bold text-xl text-center">
              ({reviewNum} {reviewNum > 1 ? "reviews" : "review"})
            </Text>
          </View>
        </View>
        <Text className="font-rubik-bold text-lg text-primary-100">
          See All
        </Text>
      </View>

      <Swiper className="h-52">
        {reviews.slice(0, 3).map((review: ReviewType, i) => {
          return <Review key={i} review={review} />;
        })}
      </Swiper>
    </View>
  );
};

export default Reviews;
