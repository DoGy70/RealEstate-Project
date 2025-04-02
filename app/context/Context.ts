import { createContext, Dispatch, SetStateAction } from "react";
import { AppwriteUser, PropertyType } from "../lib/types";

export const GlobalContext = createContext<{
  user: AppwriteUser;
  setUser: Dispatch<SetStateAction<AppwriteUser>>;
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  property: PropertyType;
  setProperty: Dispatch<SetStateAction<PropertyType>>;
} | null>(null);
