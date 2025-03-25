import { Dispatch, SetStateAction } from "react";
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
}

export declare interface CardProps {
  title: string;
  location: string;
  price: string;
  rating: number;
  image: any;
  category: string;
}

export declare interface Properties {
  id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  geolocation: string;
  price: number;
  area: number;
  bathrooms: number;
  rating: number;
  facilities: string[];
  users: any;
  galleries: any;
  reviews: any;
  image: string;
  featured: boolean;
}

export declare interface FiltersProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}
