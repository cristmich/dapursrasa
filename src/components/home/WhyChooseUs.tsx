"use client";

import { motion } from "framer-motion";
import { Leaf, Award, MenuIcon, HandPlatter, Wallet, Truck, Clock, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Setiap Hari",
    desc: "Dibuat setiap hari untuk menjamin kesegaran dan cita rasa terbaik.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Award,
    title: "Bahan Berkualitas",
    desc: "Menggunakan bahan pilihan, segar, dan higienis tanpa kompromi.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: MenuIcon,
    title: "Menu Variatif",
    desc: "Menu berganti setiap minggu agar tidak membosankan.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: HandPlatter,
    title: "Bisa Request Menu",
    desc: "Sesuaikan dengan selera atau kebutuhan khusus acara Anda.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: Wallet,
    title: "Harga Terjangkau",
    desc: "Kualitas premium dengan harga yang sangat bersahabat.",
    color: "text-[#005926]",
    bg: "bg-[#005926]/10",
    border: "border-[#005926]/10",
  },
  {
    icon: Truck,
    title: "FREE Ongkir",
    desc: "Gratis biaya kirim untuk seluruh wilayah Jabodetabek*.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    icon: Clock,
    title: "Tepat Waktu",
    desc: "Pengiriman selalu sesuai jadwal yang telah disepakati bersama.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    icon: ShieldCheck,
    title: "Higienis & Aman",
    desc: "Proses memasak dengan standar kebersihan dan sanitasi tinggi.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Users,
    title: "Cocok Untuk Semua",
    desc: "Dari event besar ratusan orang hingga acara keluarga kecil.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#005926]/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#005926] text-sm font-bold tracking-widest uppercase mb-3">
            Keunggulan Kami
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            Kenapa Memilih{" "}
            <span className="text-[#005926]">Dapur Srasa?</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Kami berkomitmen memberikan yang terbaik untuk setiap porsi yang Anda nikmati — dari dapur kami langsung ke meja Anda.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
              className={`group relative bg-white rounded-2xl border ${feature.border} p-6 flex gap-5 items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon */}
              <div className={`${feature.bg} ${feature.color} p-3.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="w-5 h-5" />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-heading font-bold text-base text-[#1a1a1a] mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>

              {/* Subtle hover glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.bg} -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom stat row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "5+", label: "Tahun Pengalaman" },
            { value: "200+", label: "Pelanggan Puas" },
            { value: "50+", label: "Varian Menu" },
            { value: "100%", label: "Bahan Halal & Segar" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-5 rounded-2xl bg-[#F8F8F8] border border-gray-100">
              <p className="font-heading text-3xl font-extrabold text-[#005926] mb-1">{value}</p>
              <p className="text-gray-500 text-sm font-medium">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
