"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User as UserIcon, LayoutDashboard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Catering Mingguan", href: "/catering-mingguan" },
  { name: "Nasi Box", href: "/nasi-box" },
  { name: "Portofolio", href: "/portofolio" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Hubungi Kami", href: "/hubungi-kami" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const isEmailAdmin = currentUser.email === adminEmail;
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().role === "superadmin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(isEmailAdmin);
          }
        } catch {
          setIsAdmin(isEmailAdmin);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const userDisplayName = user?.displayName || user?.email?.split("@")[0] || "Pengguna";
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-3" : "bg-white/95 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="Dapur Srasa Logo" width={140} height={36} className="object-contain h-9 w-auto" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#005926] relative group ${
                  pathname === link.href ? "text-[#005926]" : "text-[#555]"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#005926] transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Side: CTA + User + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                /* User Dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005926] to-[#007a36] flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
                      {userInitial}
                    </div>
                    <span className="text-sm font-medium text-[#333] max-w-[100px] truncate">{userDisplayName}</span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50"
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-800 truncate">{userDisplayName}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2 space-y-0.5">
                          {isAdmin && (
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                                <LayoutDashboard size={14} />
                              </div>
                              Dashboard Admin
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 px-3 py-2 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                              <LogOut size={14} />
                            </div>
                            Keluar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button variant="outline" render={<Link href="/login" />} className="rounded-full px-5 border-[#005926] text-[#005926] hover:bg-[#005926] hover:text-white transition-colors text-sm">
                  Masuk
                </Button>
              )}

              <Button render={<Link href="/hubungi-kami" />} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full px-5 text-sm">
                Hubungi Kami
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-[#333] hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {/* Mobile User Card */}
              {user && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#005926]/5 to-[#005926]/10 rounded-xl mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#005926] to-[#007a36] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {userInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#333] truncate">{userDisplayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-[#005926]/10 text-[#005926] font-semibold"
                      : "text-[#333] hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
                {user ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" render={<Link href="/dashboard" />} className="w-full rounded-xl border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors justify-start gap-2 px-4">
                        <LayoutDashboard size={16} />
                        Dashboard Admin
                      </Button>
                    )}
                    <Button variant="outline" onClick={handleLogout} className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 justify-start gap-2 px-4">
                      <LogOut size={16} />
                      Keluar
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" render={<Link href="/login" />} className="w-full rounded-xl border-[#005926] text-[#005926] hover:bg-[#005926] hover:text-white">
                    Masuk
                  </Button>
                )}
                <Button render={<Link href="/hubungi-kami" />} className="w-full bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl">
                  Hubungi Kami
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
