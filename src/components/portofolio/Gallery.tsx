"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Users, CalendarDays } from "lucide-react";

const categories = ["Semua", "Corporate", "Wedding", "Seminar", "Arisan", "Gathering", "Ulang Tahun"];

const portfolioData = [
  {
    id: 1,
    title: "PT ABC Annual Gathering",
    category: "Corporate",
    location: "BSD City",
    pax: 250,
    date: "12 Okt 2023",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Resepsi Pernikahan Andi & Budi",
    category: "Wedding",
    location: "Jakarta Selatan",
    pax: 500,
    date: "05 Nov 2023",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Arisan Keluarga Besar",
    category: "Arisan",
    location: "Gading Serpong",
    pax: 80,
    date: "20 Nov 2023",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Seminar Nasional Teknologi",
    category: "Seminar",
    location: "Tangerang",
    pax: 300,
    date: "15 Des 2023",
    image: "https://images.unsplash.com/photo-1548943487-a2e4b43b485b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Ulang Tahun Sweet Seventeen",
    category: "Ulang Tahun",
    location: "Alam Sutera",
    pax: 100,
    date: "10 Jan 2024",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Family Gathering 2024",
    category: "Gathering",
    location: "Sentul",
    pax: 150,
    date: "25 Feb 2024",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredData = activeCategory === "Semua" 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeCategory);

  return (
    <section className="py-12 md:py-20 bg-[#F8F8F8] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#333333] mb-4">Momen yang Telah Kami Layani</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Berbagai acara spesial yang telah mempercayakan kebutuhan konsumsinya kepada Dapur Srasa.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? "bg-[#005926] text-white" 
                  : "bg-white text-gray-600 hover:bg-[#005926]/10 hover:text-[#005926] border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-[#333333] mb-4 line-clamp-1 group-hover:text-[#005926] transition-colors">{item.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <span>{item.pax} Pax</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#D4AF37]" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Belum ada portofolio untuk kategori ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
