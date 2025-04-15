import { Query } from "react-native-appwrite";
import { FetchFilteredProperties } from "../../lib/types";
import { appwriteConfig, databases } from "./appwrite";
import { getHighestPricedProperty } from "../../lib/lib";

export const getFilteredFeaturedProperties = async (
  {
    query,
    filter,
    minimumPrice,
    maximumPrice,
    bathrooms,
    bedrooms,
  }: FetchFilteredProperties,
  limit?: number
) => {
  try {
    const andQuery = [];
    if (query)
      andQuery.push(
        Query.or([
          Query.contains("name", query),
          Query.contains("address", query),
        ])
      );

    if (filter) andQuery.push(Query.contains("type", filter));

    if (minimumPrice && maximumPrice)
      andQuery.push(Query.between("price", +minimumPrice, +maximumPrice));

    if (bathrooms) andQuery.push(Query.equal("bathrooms", +bathrooms));

    if (bedrooms) andQuery.push(Query.equal("bedrooms", +bedrooms));

    const queryBuilder = [];

    if (andQuery.length > 1) {
      queryBuilder.push(Query.and([...andQuery]));
    } else {
      queryBuilder.push(...andQuery);
    }

    if (limit) queryBuilder.push(Query.limit(limit));

    const response = await databases.listDocuments(
      appwriteConfig.databaseID!,
      appwriteConfig.propertiesCollection!,
      [...queryBuilder, Query.equal("featured", true)]
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
  {
    query,
    filter,
    minimumPrice,
    maximumPrice,
    bathrooms,
    bedrooms,
  }: FetchFilteredProperties,
  limit?: number
) => {
  try {
    const andQuery = [];
    if (query)
      andQuery.push(
        Query.or([
          Query.contains("name", query),
          Query.contains("address", query),
        ])
      );

    if (filter) andQuery.push(Query.contains("type", filter));

    if (minimumPrice || maximumPrice)
      andQuery.push(
        Query.between(
          "price",
          minimumPrice ? +minimumPrice : 0,
          maximumPrice ? +maximumPrice : 10000
        )
      );

    if (bathrooms) andQuery.push(Query.equal("bathrooms", +bathrooms));

    if (bedrooms) andQuery.push(Query.equal("bedrooms", +bedrooms));

    const queryBuilder = [];

    if (andQuery.length > 1) {
      queryBuilder.push(Query.and([...andQuery]));
    } else {
      queryBuilder.push(...andQuery);
    }

    if (limit) queryBuilder.push(Query.limit(limit));

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

export const getHighestPriceProperty = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseID!,
      appwriteConfig.propertiesCollection!
    );

    if (response.total === 0) return null;

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

    const highestPricedProperty = getHighestPricedProperty(properties);

    if (!highestPricedProperty) return null;

    return highestPricedProperty;
  } catch (error) {}
};
