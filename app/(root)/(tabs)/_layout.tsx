// app/(root)/(tabs)/_layout.js
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import icons from "@/app/constants/icons";

const TabIcon = ({
  icon,
  focused,
}: {
  icon: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View className="flex-1 flex-col">
      <Image
        source={icon}
        tintColor={focused ? "#0061FF" : "#666876"}
        className="size-8"
      />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#ecf0f1",
          height: 80,
          paddingBottom: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.house} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.person}
              className="size-8"
              tintColor={focused ? "#0061FF" : "#666876"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
