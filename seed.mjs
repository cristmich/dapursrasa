import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';

// Read .env.local manually
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=["']?(.*?)["']?$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
});

const firebaseConfig = {
  apiKey: envVars['NEXT_PUBLIC_FIREBASE_API_KEY'],
  authDomain: envVars['NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'],
  projectId: envVars['NEXT_PUBLIC_FIREBASE_PROJECT_ID'],
  storageBucket: envVars['NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: envVars['NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'],
  appId: envVars['NEXT_PUBLIC_FIREBASE_APP_ID'],
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function seedAdmin() {
  const email = envVars['NEXT_PUBLIC_ADMIN_EMAIL'];
  const password = "AdminPassword123!"; // Default password
  
  try {
    console.log(`Mencoba membuat user ${email}...`);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`User berhasil dibuat dengan UID: ${user.uid}`);

    // Create firestore document
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: "Superadmin",
      photoURL: "",
      role: "superadmin",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    
    console.log("Database user berhasil disimpan dengan role 'superadmin'!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`Email ${email} sudah terdaftar. Anda bisa langsung login dengan password yang sudah pernah Anda buat sebelumnya.`);
      process.exit(0);
    }
    console.error("Gagal melakukan seeding:", error);
    process.exit(1);
  }
}

seedAdmin();
