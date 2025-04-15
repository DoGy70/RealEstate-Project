import {
  ImageProps,
  KeyboardTypeOptions,
  TouchableOpacityProps,
} from "react-native";

export declare interface CustomTextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  additionalClasses?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  password?: boolean;
}

export declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

export declare interface User {
  name?: string;
  email: string;
  clerkId: string;
  imagUrl?: string;
}

export declare interface AppwriteUser {
  id: string;
  clerkId: string;
  name?: string;
  email: string;
  imageUrl?: string;
  favoriteProperties: string[];
}

export declare interface CardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  image: any;
  category: string;
  onPropertyPress: (id: string) => void;
}

export declare interface PropertyType {
  id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  geolocation: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: facilityType[];
  galleries: any;
  reviews: any;
  image: string;
  featured: boolean;
  users: any;
}

export declare type facilityType =
  | "Laundry"
  | "Car Parking"
  | "Sports Center"
  | "Cutlery"
  | "Gym"
  | "Swimming pool"
  | "Wifi"
  | "Pet Center";

export declare interface ReviewsProps {
  rating: number;
  reviewNum: number;
  reviews: ReviewType[];
}

export declare interface ReviewType {
  name: string;
  avatar: string;
  review: string;
  rating: number;
  properties: PropertyType;
  users: AppwriteUser;
  $createdAt: string;
}

export declare interface NumberInputProps {
  title: string;
  facility: string | number;
  handleFacilityIncrease: () => void;
  handleFacilityDecrease: () => void;
}

export declare interface FetchFilteredProperties {
  query: string | null;
  filter: string | null;
  minimumPrice: string | null;
  maximumPrice: string | null;
  bathrooms: string | null;
  bedrooms: string | null;
}

export declare interface BookingType {
  id: string;
  property: PropertyType;
  price: number;
  startDate: Date;
  endDate: Date;
  dateBooked: Date;
  user: AppwriteUser;
}
