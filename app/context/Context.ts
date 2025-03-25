import { createContext, Dispatch, SetStateAction } from "react";
import { AppwriteUser } from "../lib/types";

export const GlobalContext = createContext<{
  user: AppwriteUser;
  setUser: Dispatch<SetStateAction<AppwriteUser>>;
} | null>(null);
