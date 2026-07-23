import { collection, doc, getDocs, updateDoc, setDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { db, firebaseConfig } from "./config";

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

export const updateUser = async (uid: string, data: { displayName?: string; role?: string }): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const createUser = async (email: string, password: string, displayName: string, role: string) => {
  try {
    // We use a secondary Firebase App to create a user without signing out the current admin
    const secondaryAppName = "SecondaryUserApp_" + Date.now();
    const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
    const secondaryAuth = getAuth(secondaryApp);

    // Create user in Auth
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const newUser = userCredential.user;

    // Sign out from the secondary app immediately so it doesn't persist
    await signOut(secondaryAuth);

    // Write to Firestore using the primary db instance
    const userRef = doc(db, "users", newUser.uid);
    await setDoc(userRef, {
      uid: newUser.uid,
      email: newUser.email,
      displayName: displayName,
      role: role,
      createdAt: serverTimestamp(),
      lastLogin: null,
    });

    return { success: true, uid: newUser.uid };
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error(error.message || "Failed to create user");
  }
};

