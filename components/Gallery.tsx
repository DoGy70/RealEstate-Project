import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Title from "./Title";
import ReactNativeModal from "react-native-modal";
import Swiper from "react-native-swiper";
import GalleryImage, { GalleryOpacity } from "./GalleryImage";

const Gallery = ({ galleries }: { galleries: any }) => {
  const [showModal, setShowModal] = useState(false);

  const handleGalleryModal = () => {
    setShowModal((oldModal) => !oldModal);
  };

  return (
    <View className="gap-3">
      <Title title="Gallery" />
      <View className="flex flex-row gap-3">
        {galleries.slice(0, 3).map((gallery: { image: any }, index: number) => {
          if (index == 2) {
            return (
              <GalleryOpacity
                galleries={galleries.length}
                image={gallery.image}
                key={gallery.image}
                onPress={handleGalleryModal}
              />
            );
          }

          return <GalleryImage image={gallery.image} key={gallery.image} />;
        })}
      </View>
      <ReactNativeModal
        isVisible={showModal}
        onBackdropPress={() => setShowModal((oldModal) => !oldModal)}
      >
        <View className="w-full h-[350px] bg-white rounded-xl">
          <Swiper className="rounded-xl">
            {galleries.map((gallery: { image: any }) => {
              return (
                <Image
                  key={gallery.image}
                  source={{ uri: gallery.image }}
                  className="w-full h-full rounded-xl"
                />
              );
            })}
          </Swiper>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Gallery;
