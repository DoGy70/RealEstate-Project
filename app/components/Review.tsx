import { View, Text, Image } from "react-native";
import React from "react";
import { ReviewType } from "../lib/types";
import icons from "../constants/icons";
import { timeAgo } from "../lib/lib";

const Review = ({ review }: { review: ReviewType }) => {
  return (
    <View className="flex-col gap-3">
      <View className="flex-row gap-2 items-center">
        <Image
          source={{ uri: review?.avatar }}
          className="size-12 rounded-full"
        />
        <Text className="font-rubik-bold">{review.name}</Text>
      </View>
      <Text
        className="font-rubik text-black-300 leading-snug"
        numberOfLines={3}
      >
        {review.review}
      </Text>
      <View className="flex-row justify-between">
        <View className="flex-row gap-2 items-center">
          <Image source={icons.heart} className="size-6" tintColor="#0061FF" />
          <Text className="font-rubik-medium">{review.rating}</Text>
        </View>
        <Text className="font-rubik text-black-300 text-sm">
          {timeAgo(new Date(review.$createdAt))}
        </Text>
      </View>
    </View>
  );
};

export default Review;
