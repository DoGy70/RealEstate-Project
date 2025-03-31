import { createContext, Dispatch, SetStateAction } from "react";
import { AppwriteUser } from "../lib/types";

export const GlobalContext = createContext<{
  user: AppwriteUser;
  setUser: Dispatch<SetStateAction<AppwriteUser>>;
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
} | null>(null);
