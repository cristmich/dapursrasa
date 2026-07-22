"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

export function RedirectIfAdmin() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists() && userSnap.data().role === "superadmin") {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error checking admin role on landing page:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}
