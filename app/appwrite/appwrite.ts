import { Client, ID, Databases, Query } from "react-native-appwrite";
import { AppwriteUser, FetchFilteredProperties, User } from "../lib/types";

const projectID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const platform = process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

const client = new Client()
  .setProject(projectID!)
  .setPlatform(platform!)
  .setEndpoint(endpoint!);
export const databases = new Databases(client);

export const appwriteConfig = {
  databaseID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollection: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  reviewsCollection: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  galleriesCollection: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  propertiesCollection:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};
