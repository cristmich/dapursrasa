import { collection, doc, getDocs, setDoc, deleteDoc, serverTimestamp, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "./config";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt?: any;
}

export interface PricingTier {
  pax: number;
  price: number;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  weeklyMenus: {
    senin: string[];
    selasa: string[];
    rabu: string[];
    kamis: string[];
    jumat: string[];
  };
  pricing: PricingTier[];
  createdAt?: any;
}

// Function to get all documents from a collection generically
export const getMenus = async <T = MenuItem>(collectionName: string): Promise<T[]> => {
  try {
    const menusRef = collection(db, collectionName);
    const q = query(menusRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as unknown as T));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
};

// Function to add a new document generically
export const addMenu = async <T extends { [key: string]: any }>(collectionName: string, menuData: T): Promise<void> => {
  try {
    const newMenuRef = doc(collection(db, collectionName));
    await setDoc(newMenuRef, {
      ...menuData,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
    throw error;
  }
};

// Function to update an existing document
export const updateMenu = async <T extends { [key: string]: any }>(collectionName: string, menuId: string, menuData: Partial<T>): Promise<void> => {
  try {
    const menuRef = doc(db, collectionName, menuId);
    await updateDoc(menuRef, {
      ...menuData
    });
  } catch (error) {
    console.error(`Error updating ${collectionName}:`, error);
    throw error;
  }
};

// Function to delete a document
export const deleteMenu = async (collectionName: string, menuId: string): Promise<void> => {
  try {
    const menuRef = doc(db, collectionName, menuId);
    await deleteDoc(menuRef);
  } catch (error) {
    console.error(`Error deleting from ${collectionName}:`, error);
    throw error;
  }
};
