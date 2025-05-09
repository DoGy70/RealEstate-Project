import { ID } from "react-native-appwrite";
import { databases, appwriteConfig } from "@/appwrite/appwrite";
import { agentImages, galleryImages, propertiesImages } from "./data";

const COLLECTIONS = {
  USER: appwriteConfig.usersCollection!,
  REVIEWS: appwriteConfig.reviewsCollection!,
  GALLERY: appwriteConfig.galleriesCollection!,
  PROPERTY: appwriteConfig.propertiesCollection!,
};

const propertyTypes = [
  "Къща",
  "Апартамент",
  "Дуплекс",
  "Студио",
  "Вила",
  "Друго",
];

const facilities = [
  "Пералня",
  "Паркинг",
  "Спортен център",
  "Прибори",
  "Фитнес",
  "Басейн",
  "Wifi",
  "Кът за любимци",
];

const addresses = [
  "8 33 кв. Враждебна, Kremikovci, Sofia",
  "Cabacum Beach Residence, Golden Sands, Varna Province, Bulgaria​",
  "3 Sv. Georgi Sofiyski St kv., Kriva reka, Sofia",
  "38 Chavdar Mutafov St, ж.г. Зоопарк, Sofia",
  "24 Omainiche St, Sofia, 1137, Bulgaria",
  "Santa Marina Holiday Village, 8130 Sozopol, Bulgaria",
  "33 Damyan Gruev St, Sofia, 1606",
  "Paradise Bay Area, Budzhaka, 8130 Sozopol, Bulgaria",
  "бл.72, Sofia",
  "ул. Граф Игнатиев 12, Sofia",
  "ул. Шипка 6, Sofia",
  "Melia Resort 6, Aurelia district, 8230 Nessebar, Bulgaria",
  "8 33 кв. Враждебна, Kremikovci, Sofia",
  "бул. Патриарх Евтимий 36, Sofia",
  "ул. Шипка 6, Sofia",
  "La Mer Apartcomplex, k.k. Chaika, 9007 Golden Sands, Varna, Bulgaria",
  "ул. Раковски 108, Sofia",
  "бул. Цар Освободител 22, Sofia",
  "ул. Славянска 3, Sofia",
  "бул. България 98, Sofia",
  "ул. Оборище 21, Sofia",
];

function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number
): T[] {
  if (minItems > maxItems) {
    throw new Error("minItems cannot be greater than maxItems");
  }
  if (minItems < 0 || maxItems > array.length) {
    throw new Error(
      "minItems or maxItems are out of valid range for the array"
    );
  }

  // Generate a random size for the subset within the range [minItems, maxItems]
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

  // Create a copy of the array to avoid modifying the original
  const arrayCopy = [...array];

  // Shuffle the array copy using Fisher-Yates algorithm
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  // Return the first `subsetSize` elements of the shuffled array
  return arrayCopy.slice(0, subsetSize);
}

async function seed() {
  try {
    // Clear existing data from all collections
    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
      const documents = await databases.listDocuments(
        appwriteConfig.databaseID!,
        collectionId!
      );
      for (const doc of documents.documents) {
        await databases.deleteDocument(
          appwriteConfig.databaseID!,
          collectionId!,
          doc.$id
        );
      }
    }

    console.log("Cleared all existing data.");

    // Seed Users
    const users = [];
    for (let i = 1; i <= 5; i++) {
      const user = await databases.createDocument(
        appwriteConfig.databaseID!,
        COLLECTIONS.USER!,
        ID.unique(),
        {
          name: `Агент ${i}`,
          email: `agent${i}@example.com`,
          imageUrl: agentImages[Math.floor(Math.random() * agentImages.length)],
          clerkId: `${i}`,
        }
      );
      users.push(user);
    }
    console.log(`Seeded ${users.length} users.`);

    // Seed Reviews
    const reviews = [];
    for (let i = 1; i <= 20; i++) {
      const review = await databases.createDocument(
        appwriteConfig.databaseID!,
        COLLECTIONS.REVIEWS!,
        ID.unique(),
        {
          name: `Reviewer ${i}`,
          review: `This is a review by Reviewer ${i}.`,
          rating: Math.floor(Math.random() * 5) + 1, // Rating between 1 and 5
          users: users[Math.floor(Math.random() * users.length)].$id,
        }
      );
      reviews.push(review);
    }
    console.log(`Seeded ${reviews.length} reviews.`);

    // Seed Galleries
    const galleries = [];
    for (const image of galleryImages) {
      const gallery = await databases.createDocument(
        appwriteConfig.databaseID!,
        COLLECTIONS.GALLERY!,
        ID.unique(),
        { image }
      );
      galleries.push(gallery);
    }

    console.log(`Seeded ${galleries.length} galleries.`);

    // Seed Properties
    for (let i = 1; i <= 20; i++) {
      const assignedAgent = users[Math.floor(Math.random() * users.length)];

      const assignedReviews = getRandomSubset(reviews, 5, 7); // 5 to 7 reviews
      const assignedGalleries = getRandomSubset(galleries, 3, 8); // 3 to 8 galleries

      const selectedFacilities = facilities
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * facilities.length) + 1);

      const image =
        propertiesImages.length - 1 >= i
          ? propertiesImages[i]
          : propertiesImages[
              Math.floor(Math.random() * propertiesImages.length)
            ];

      const property = await databases.createDocument(
        appwriteConfig.databaseID!,
        COLLECTIONS.PROPERTY!,
        ID.unique(),
        {
          name: `Property ${i}`,
          type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          description: `Това е описание за имот ${i}.`,
          address: addresses[i],
          price: Math.floor(Math.random() * 9000) + 1000,
          area: Math.floor(Math.random() * 3000) + 500,
          bedrooms: Math.floor(Math.random() * 5) + 1,
          bathrooms: Math.floor(Math.random() * 5) + 1,
          rating: Math.floor(Math.random() * 5) + 1,
          facilities: selectedFacilities,
          image: image,
          users: assignedAgent.$id,
          reviews: assignedReviews.map((review) => review.$id),
          galleries: assignedGalleries.map((gallery) => gallery.$id),
          featured: i % 2 == 0,
        }
      );

      console.log(`Seeded property: ${property.name}`);
    }

    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

export default seed;
