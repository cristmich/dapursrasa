"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { AlertCircle, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const saveUserToFirestore = async (user: any) => {
    if (!user) return false;
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const isSuperadmin = user.email === adminEmail;

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          role: isSuperadmin ? "superadmin" : "user",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        const updateData: any = { lastLogin: serverTimestamp() };
        if (isSuperadmin && userSnap.data().role !== "superadmin") {
          updateData.role = "superadmin";
        }
        await setDoc(userRef, updateData, { merge: true });
      }
      const role = userSnap.exists() ? userSnap.data().role : "user";
      const isStaff = ["superadmin", "super admin", "admin toko", "waiters", "dapur"].includes(role);
      
      return isSuperadmin || isStaff;
    } catch (error) {
      console.error("Gagal menyimpan ke Firestore:", error);
      return isSuperadmin;
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = await saveUserToFirestore(userCredential.user);
      if (isAdmin) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Email atau password yang Anda masukkan salah.");
      } else {
        setError(`Terjadi kesalahan: ${err.message || err.code}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#005926] via-[#004a20] to-[#002e13] overflow-hidden flex-col items-center justify-center p-16">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#D4AF37]/10" />
        <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-white/3 blur-2xl" />

        <div className="relative z-10 text-center max-w-sm">
          <Link href="/" className="inline-block mb-10">
            <Image src="/logo-white.png" alt="Dapur Srasa" width={160} height={50} className="object-contain h-12 w-auto" priority />
          </Link>

          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-8" />

          <h2 className="font-heading text-3xl font-bold text-white mb-4 leading-snug">
            Selamat Datang di<br />
            <span className="text-[#D4AF37]">Dapur Srasa</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Masuk untuk mengelola menu, pesanan, dan operasional catering Anda dengan mudah.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[
              { value: "200+", label: "Pelanggan" },
              { value: "5★", label: "Rating" },
              { value: "100%", label: "Halal" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 border border-white/10">
                <p className="text-[#D4AF37] font-bold text-xl font-heading">{s.value}</p>
                <p className="text-white/50 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12 bg-[#FAFAFA]">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/">
              <Image src="/logo.png" alt="Dapur Srasa" width={140} height={40} className="object-contain" priority />
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-3xl font-extrabold text-[#1a1a1a] mb-2">
              Masuk
            </h1>
            <p className="text-gray-500 text-base">
              Silakan masukkan kredensial Anda untuk melanjutkan.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-start gap-3 text-sm border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[#333]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-[#1a1a1a] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005926]/30 focus:border-[#005926] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-[#333]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-white text-[#1a1a1a] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005926]/30 focus:border-[#005926] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#005926] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#005926] hover:bg-[#004a1f] text-white font-semibold rounded-2xl py-4 text-base transition-all shadow-lg shadow-[#005926]/20 hover:shadow-[#005926]/30 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>

          {/* Back to Home */}
          <p className="text-center text-sm text-gray-400 mt-8">
            <Link href="/" className="hover:text-[#005926] transition-colors hover:underline">
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
