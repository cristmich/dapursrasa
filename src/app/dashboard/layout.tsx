"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  LayoutDashboard,
  Utensils,
  Package,
  LogOut,
  ChevronRight,
  Globe,
  MenuSquare,
  Coffee,
  Users,
  History,
  FileText,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const isEmailAdmin = u.email === adminEmail;

        if (isEmailAdmin) {
          setIsAuthorized(true);
          setIsLoading(false);
        } else {
          try {
            const userRef = doc(db, "users", u.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists() && (userSnap.data().role === "superadmin" || userSnap.data().role === "super admin")) {
              setIsAuthorized(true);
            } else {
              router.push("/");
            }
          } catch {
            router.push("/");
          }
          setIsLoading(false);
        }
      } else {
        router.push("/login");
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#005926]/10 flex items-center justify-center mx-auto">
            <Loader2 className="w-7 h-7 text-[#005926] animate-spin" />
          </div>
          <p className="text-gray-500 text-sm font-medium">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  const navItems = [
    { name: "Ringkasan", href: "/dashboard", icon: LayoutDashboard },
    { name: "Catering Mingguan", href: "/dashboard/catering-mingguan", icon: Utensils },
    { name: "Nasi Box", href: "/dashboard/nasi-box", icon: Package },
    { name: "Menu Resto", href: "/dashboard/menu-resto", icon: Coffee },
    { name: "History Stok", href: "/dashboard/history-resto", icon: History },
    { name: "Daftar Menu", href: "/dashboard/daftar-menu", icon: MenuSquare },
    { name: "Artikel", href: "/dashboard/artikel", icon: FileText },
    { name: "Pengguna", href: "/dashboard/users", icon: Users },
  ];

  const userDisplayName = user?.displayName || user?.email?.split("@")[0] || "Admin";
  const userInitial = userDisplayName.charAt(0).toUpperCase();
  const currentPage = navItems.find((i) => i.href === pathname);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── TOP HEADER ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 gap-4">
        
        {/* Logo */}
        <Link href="/" className="shrink-0 mr-2">
          <Image
            src="/logo.png"
            alt="Dapur Srasa"
            width={100}
            height={28}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Divider */}
        <div className="hidden md:block h-5 w-px bg-gray-200" />

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400 flex-1">
          <span className="font-medium text-gray-500">Dashboard</span>
          {currentPage && currentPage.href !== "/dashboard" && (
            <>
              <ChevronRight size={13} />
              <span className="text-gray-700 font-semibold">{currentPage.name}</span>
            </>
          )}
        </div>

        {/* Page title on mobile */}
        <p className="md:hidden flex-1 text-sm font-semibold text-gray-800 truncate">
          {currentPage?.name ?? "Dashboard"}
        </p>

        {/* Right: back link + user */}
        <div className="flex items-center gap-3 ml-auto">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#005926] transition-colors"
          >
            <Globe size={13} />
            Lihat Website
          </Link>

          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#005926] to-[#007a36] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {userInitial}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-xs font-semibold text-gray-800 truncate max-w-[96px]">{userDisplayName}</p>
              <p className="text-[10px] text-[#D4AF37] font-semibold">Superadmin</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div className="flex pt-14 min-h-screen">

        {/* ── SIDEBAR (desktop only) ─────────────────────────── */}
        <aside className="fixed top-14 left-0 bottom-0 w-56 bg-white border-r border-gray-100 flex-col hidden md:flex z-40">
          
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-2 pb-3">
              Menu
            </p>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#005926] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? "text-white" : "text-gray-400"}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-3 border-t border-gray-100 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-[#005926] rounded-xl transition-colors"
            >
              <Globe size={16} className="text-gray-400" />
              Lihat Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────────── */}
        <main className="flex-1 md:ml-56 p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAV ──────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-stretch h-16 shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.08)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
                isActive ? "text-[#005926]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isActive ? "bg-[#005926]/10" : ""
                }`}
              >
                <Icon size={18} />
              </div>
              <span className="leading-none">{item.name.split(" ")[0]}</span>
            </Link>
          );
        })}

        {/* Logout on mobile bottom nav */}
        <button
          onClick={handleLogout}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-red-400 hover:text-red-600 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center">
            <LogOut size={18} />
          </div>
          <span className="leading-none">Keluar</span>
        </button>
      </nav>

    </div>
  );
}
