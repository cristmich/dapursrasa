"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";

const stats = [
  { icon: Star, label: "5.0 Rating", value: "Pelanggan Setia" },
  { icon: ShieldCheck, label: "100% Halal", value: "Bersertifikat" },
  { icon: Clock, label: "On-time", value: "Pengiriman" },
];

export function Hero({ areaName }: { areaName?: string }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-[#F8F8F8] to-[#e8f3ec] pt-20">
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-[#005926]/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 right-[-80px] w-[350px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-3xl -z-0" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-12 md:py-20">
          
          {/* === LEFT: Text Content === */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-7"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 w-fit rounded-full border border-[#005926]/30 bg-[#005926]/10 px-4 py-2 text-[#005926]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005926] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005926]"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide">Premium Home-cooked Meals</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-heading text-4xl md:text-5xl xl:text-[3.75rem] font-extrabold leading-[1.15] text-[#1a1a1a]">
              Nasi Box Murah Mulai{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-[#005926]">Rp35.000</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-[80%] h-[0.4em] w-full fill-[#D4AF37]/50"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </svg>
              </span>{" "}
              Free Ongkir {areaName || 'Jabodetabek'}
            </h1>

            {/* Subtext */}
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
              Catering nasi box berkualitas dengan harga terjangkau. Cocok untuk meeting, seminar, gathering, ulang tahun, hingga wedding. Tersedia berbagai pilihan menu dengan cita rasa rumahan premium.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                render={<a href="https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20tertarik%20dengan%20promo%20Nasi%20Box%20Rp35.000.%20%28Dari%20Beranda%20Utama%29" target="_blank" rel="noopener noreferrer" />}
                size="lg"
                className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full text-base h-14 px-8 shadow-lg shadow-[#005926]/30 hover:shadow-[#005926]/40 transition-all"
              >
                Pesan via WhatsApp
              </Button>
              <Button
                render={<Link href="/catering-mingguan" />}
                variant="outline"
                size="lg"
                className="rounded-full text-base h-14 px-8 border-2 border-[#005926] text-[#005926] bg-transparent hover:bg-[#005926]/5 group"
              >
                Lihat Menu Mingguan
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-6 pt-4 border-t border-gray-200"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="bg-[#005926]/10 p-2 rounded-full text-[#005926]">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 leading-none">{value}</p>
                    <p className="text-sm font-bold text-[#333333] leading-snug">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* === RIGHT: Image === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image card */}
            <div className="relative h-[420px] md:h-[540px] xl:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#005926]/20 ring-1 ring-black/5">
              <Image
                src="/hero-image.png"
                alt="Premium Nasi Box Dapur Srasa"
                fill
                className="object-cover"
                priority
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Bottom caption inside image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
                  <div>
                    <p className="text-white/70 text-xs font-medium">Paket Harian</p>
                    <p className="text-white font-bold text-lg leading-tight">Catering Mingguan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs font-medium">Mulai dari</p>
                    <p className="text-[#D4AF37] font-extrabold text-2xl leading-tight">Rp 35rb</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
              className="absolute -top-5 -right-5 md:top-6 md:-right-10 bg-white rounded-2xl shadow-xl px-5 py-3 border border-gray-100"
            >
              <p className="text-xs text-gray-400 font-medium">Area layanan</p>
              <p className="font-bold text-[#005926] text-sm">{areaName || 'Jabodetabek'}</p>
              <p className="text-xs text-[#D4AF37] font-semibold">FREE Ongkir*</p>
            </motion.div>

            {/* Floating rating badge bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-5 md:bottom-10 md:-left-10 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {["🧑", "👩", "👨"].map((emoji, i) => (
                  <span key={i} className="flex items-center justify-center w-8 h-8 rounded-full bg-[#005926]/10 text-sm ring-2 ring-white">
                    {emoji}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">200+ ulasan positif</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
