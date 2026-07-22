import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';

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

async function fixAdmin() {
  const email = envVars['NEXT_PUBLIC_ADMIN_EMAIL'];
  const password = "AdminPassword123!";
  
  try {
    console.log(`Mencoba login sebagai ${email}...`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`Login berhasil! UID: ${user.uid}`);

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: "Superadmin",
      photoURL: "",
      role: "superadmin",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    }, { merge: true });
    
    console.log("Berhasil memperbarui role menjadi 'superadmin' di Firestore.");
    process.exit(0);
  } catch (error) {
    console.error("Gagal memperbaiki admin:", error);
    process.exit(1);
  }
}

fixAdmin();
