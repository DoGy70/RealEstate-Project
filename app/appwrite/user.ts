import { ID, Query } from "react-native-appwrite";
import { User } from "../lib/types";
import { appwriteConfig, databases } from "./appwrite";

export const addUser = async (user: User) => {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.usersCollection!,
      ID.unique(),
      user
    );

    return response.$collectionId;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (userId: string | undefined) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseID!,
      appwriteConfig.usersCollection!,
      [Query.equal("clerkId", userId!)]
    );

    if (!response) throw new Error("There was a problem fetching the user.");

    const user = response.documents[0];
    return {
      id: user.$id,
      name: user.name,
      clerkId: user.clerkId,
      email: user.email,
      imageUrl: user.imageUrl,
      favoriteProperties: user.favorite_properties.map(
        (favorite_property: any) => {
          return favorite_property.$id;
        }
      ),
    };
  } catch (error) {
    console.error(error);
  }
};

export const updateUserPicture = async (
  userId: string | undefined,
  imageUrl: string | undefined
) => {
  try {
    if (!userId) throw new Error("No user id provided");

    const response = await databases.updateDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.usersCollection!,
      userId,
      { imageUrl }
    );

    if (!response)
      throw new Error("There was a problem with updating the user.");

    return response.$id;
  } catch (error) {
    console.error(error);
  }
};

export const addToFavorites = async (userId: string, propertyId: string) => {
  try {
    const document = await databases.getDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.usersCollection!,
      userId
    );

    if (!document) throw new Error("No user with that id.");

    const response = await databases.updateDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.usersCollection!,
      userId,
      {
        favorite_properties: [...document.favorite_properties, propertyId],
      }
    );

    if (!response) throw new Error("Error updating favorite_properties");
  } catch (error) {
    console.error(error);
  }
};

export const removeFromFavorites = async (
  userId: string,
  propertyId: string
) => {
  try {
    const document = await databases.getDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.usersCollection!,
      userId
    );

    if (!document) throw new Error("No user with that id.");

    const newFavorites = document.favorite_properties.filter(
      (favoriteProperty: any) => {
        if (favoriteProperty.$id !== propertyId) {
          return favoriteProperty.$id;
        }
      }
    );

    const response = await databases.updateDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.usersCollection!,
      userId,
      {
        favorite_properties: [...newFavorites],
      }
    );

    if (!response) throw new Error("Error with updating favorite properties");
  } catch (error) {
    console.error(error);
  }
};
