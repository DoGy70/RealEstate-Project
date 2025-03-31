import { Client, ID, Databases, Query } from "react-native-appwrite";
import { AppwriteUser, User } from "../lib/types";

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

export const getFilteredFeaturedProperties = async (
  query: string = "",
  filter: string = "",
  limit?: number
) => {
  try {
    const queryBuilder = [
      Query.and([
        Query.contains("name", query),
        Query.contains("type", filter),
        Query.equal("featured", true),
      ]),
    ];

    if (limit) {
      queryBuilder.push(Query.limit(limit));
    }

    const response = await databases.listDocuments(
      appwriteConfig.databaseID!,
      appwriteConfig.propertiesCollection!,
      [...queryBuilder]
    );

    if (response?.total === 0) return null;

    const documents = response.documents;
    const queriedProperties = documents.map((document) => {
      return {
        id: document.$id,
        name: document.name,
        type: document.type,
        description: document.description,
        address: document.address,
        geolocation: document.geolocation,
        price: document.price,
        area: document.area,
        bathrooms: document.bathrooms,
        bedrooms: document.bedrooms,
        rating: document.rating,
        facilities: document.facilities,
        users: document.users,
        galleries: document.galleries,
        reviews: document.reviews,
        image: document.image,
        featured: document.featured,
      };
    });

    return queriedProperties;
  } catch (error) {
    console.error(error);
  }
};

export const getFilteredProperties = async (
  query: string = "",
  filter: string = "",
  limit?: number
) => {
  try {
    const queryBuilder = [
      Query.and([
        Query.contains("name", query),
        Query.contains("type", filter),
      ]),
    ];

    if (limit) {
      queryBuilder.push(Query.limit(limit));
    }

    const response = await databases.listDocuments(
      appwriteConfig.databaseID!,
      appwriteConfig.propertiesCollection!,
      [...queryBuilder]
    );

    if (response?.total === 0) return null;

    const documents = response.documents;
    const queriedProperties = documents.map((document) => {
      return {
        id: document.$id,
        name: document.name,
        type: document.type,
        description: document.description,
        address: document.address,
        geolocation: document.geolocation,
        price: document.price,
        area: document.area,
        bathrooms: document.bathrooms,
        bedrooms: document.bedrooms,
        rating: document.rating,
        facilities: document.facilities,
        users: document.users,
        galleries: document.galleries,
        reviews: document.reviews,
        image: document.image,
        featured: document.featured,
      };
    });

    return queriedProperties;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProperties = async (limit?: number) => {
  try {
    const queryBuilder = [];

    if (limit) {
      queryBuilder.push(Query.limit(limit));
    }

    const response = await databases.listDocuments(
      appwriteConfig.databaseID!,
      appwriteConfig.propertiesCollection!,
      [...queryBuilder]
    );

    if (response.total > 0) {
      const properties = response.documents.map((document) => {
        return {
          id: document.$id,
          name: document.name,
          type: document.type,
          description: document.description,
          address: document.address,
          geolocation: document.geolocation,
          price: document.price,
          area: document.area,
          bathrooms: document.bathrooms,
          bedrooms: document.bedrooms,
          rating: document.rating,
          facilities: document.facilities,
          users: document.users,
          galleries: document.galleries,
          reviews: document.reviews,
          image: document.image,
          featured: document.featured,
        };
      });

      return properties;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const document = await databases.getDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.propertiesCollection!,
      id
    );

    if (!document) return null;

    const property = {
      id: document.$id,
      name: document.name,
      type: document.type,
      description: document.description,
      address: document.address,
      geolocation: document.geolocation,
      price: document.price,
      area: document.area,
      bathrooms: document.bathrooms,
      bedrooms: document.bedrooms,
      rating: document.rating,
      facilities: document.facilities,
      users: document.users,
      galleries: document.galleries,
      reviews: document.reviews,
      image: document.image,
      featured: document.featured,
    };

    return property;
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
