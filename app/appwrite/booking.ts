import { ID, Query } from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";
import { DateType } from "react-native-ui-datepicker";
import { PropertyType } from "../lib/types";

export const getBookingsByUserId = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseID!,
      appwriteConfig.bookingsCollection!,
      [Query.equal(userId, userId)]
    );

    if (response.total > 0) return response.documents;

    return null;
  } catch (error) {
    console.error(error);
  }
};

export const createBooking = async (
  userId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  dateBooked: Date,
  property: PropertyType
) => {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseID!,
      appwriteConfig.bookingsCollection!,
      ID.unique(),
      {
        price,
        startDate,
        endDate,
        dateBooked,
        properties: property.id,
        users: userId,
      }
    );

    if (!response) return null;

    return response.$id;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
};
