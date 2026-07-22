import { collection, doc, getDocs, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "./config";

export interface UserDocument {
  id?: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: string;
  createdAt: any;
  lastLogin: any;
}

export const getUsers = async (): Promise<UserDocument[]> => {
  try {
    const usersRef = collection(db, "users");
    // We order by email or created at, since some older docs might not have createdAt, we just get all.
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as UserDocument));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const updateUserRole = async (uid: string, newRole: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      role: newRole
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};
