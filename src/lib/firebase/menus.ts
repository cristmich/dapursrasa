import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, serverTimestamp, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "./config";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isActiveToko?: boolean;
  isActiveNasiBox?: boolean;
  createdAt?: any;
}

export interface MenuRestoItem {
  id: string;
  daftarMenuId?: string; // Tautan ke item di Daftar Menu (opsional, bisa bebas)
  name: string;
  category: string;
  price: number;
  stockIn: number;
  stockOut: number;
  createdAt?: any;
}

export interface PricingTier {
  pax: number;
  price: number;
}

export interface CateringPackage {
  id: string;
  name: string;
  period: string;
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

export interface ArticleItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  status: "Draft" | "Published";
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

// Function to get a single document from a collection generically
export const getMenu = async <T = MenuItem>(collectionName: string, id: string): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as T;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${collectionName} item:`, error);
    return null;
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
    await updateDoc(menuRef, menuData as any);
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
