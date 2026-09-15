"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Users, CalendarDays } from "lucide-react";

const categories = [
  "Semua",
  "Corporate",
  "Catering Harian",
  "Gathering",
  "Rapat/Meeting",
];

export const portfolioData = [
  {
    id: 1,
    title: "Pesanan Nasi Box - Daging Teriyaki",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 23,
    date: "Corporate Event",
    image: "/portofolio/porto-1.jpg",
  },
  {
    id: 2,
    title: "Pesanan Nasi Box - Daging Lada Hitam",
    category: "Rapat/Meeting",
    location: "BSD City",
    pax: 15,
    date: "Meeting Kantor",
    image: "/portofolio/porto-2.jpg",
  },
  {
    id: 3,
    title: "Pesanan Nasi Box Premium",
    category: "Gathering",
    location: "Tangerang",
    pax: 15,
    date: "Acara Keluarga",
    image: "/portofolio/porto-3.jpg",
  },
  {
    id: 4,
    title: "Catering Harian - Menu Ayam Goreng Asin",
    category: "Catering Harian",
    location: "Alam Sutera",
    pax: 11,
    date: "Catering Mingguan",
    image: "/portofolio/porto-4.jpg",
  },
  {
    id: 5,
    title: "Pesanan 10 Box - Daging Lada Hitam",
    category: "Corporate",
    location: "Tangerang",
    pax: 10,
    date: "Acara Perusahaan",
    image: "/portofolio/porto-5.jpg",
  },
  {
    id: 6,
    title: "Pesanan 30 Box - Daging Rendang",
    category: "Gathering",
    location: "BSD City",
    pax: 30,
    date: "Acara Komunitas",
    image: "/portofolio/porto-6.jpg",
  },
  {
    id: 7,
    title: "Pesanan 23 Box - Ayam Gulay",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 23,
    date: "Corporate Event",
    image: "/portofolio/porto-7.jpg",
  },
  {
    id: 8,
    title: "Pesanan 30 Box - Daging Lada Hitam",
    category: "Rapat/Meeting",
    location: "Jakarta",
    pax: 30,
    date: "Meeting Kantor",
    image: "/portofolio/porto-8.jpg",
  },
  {
    id: 9,
    title: "Pesanan 20 Box - Daging Lada Hitam",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 20,
    date: "Acara Kantor",
    image: "/portofolio/porto-9.jpg",
  },
  {
    id: 10,
    title: "Pesanan 79 Box - Ayam Goreng",
    category: "Gathering",
    location: "Jakarta Barat",
    pax: 79,
    date: "Event Besar",
    image: "/portofolio/porto-10.jpg",
  },
  {
    id: 11,
    title: "Pesanan 24 Box - Dori Telor Asin",
    category: "Corporate",
    location: "Tangerang",
    pax: 24,
    date: "Meeting",
    image: "/portofolio/porto-11.jpg",
  },
  {
    id: 12,
    title: "Pesanan 10 Box - Daging Lada Hitam & Pare",
    category: "Rapat/Meeting",
    location: "Serpong",
    pax: 10,
    date: "Rapat Tim",
    image: "/portofolio/porto-12.jpg",
  },
  {
    id: 13,
    title: "Pesanan 45 Box - Udang Telor Asin",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 45,
    date: "Corporate Event",
    image: "/portofolio/porto-13.jpg",
  },
  {
    id: 14,
    title: "Pesanan 43 Box - Ayam Asam Manis",
    category: "Gathering",
    location: "Alam Sutera",
    pax: 43,
    date: "Gathering",
    image: "/portofolio/porto-14.jpg",
  },
  {
    id: 15,
    title: "Pesanan 24 Box - Dori Sambal Matah",
    category: "Rapat/Meeting",
    location: "Tangerang",
    pax: 24,
    date: "Rapat Kantor",
    image: "/portofolio/porto-15.jpg",
  },
  {
    id: 16,
    title: "Catering Harian - Daging Rendang",
    category: "Catering Harian",
    location: "BSD City",
    pax: 8,
    date: "Menu Harian",
    image: "/portofolio/porto-16.jpg",
  },
  {
    id: 17,
    title: "Catering Harian - Ayam Goreng Asin",
    category: "Catering Harian",
    location: "Jakarta",
    pax: 10,
    date: "Menu Harian",
    image: "/portofolio/porto-17.jpg",
  },
  {
    id: 18,
    title: "Pesanan 24 Box - Tenggiri Balado",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 24,
    date: "Corporate Event",
    image: "/portofolio/porto-18.jpg",
  },
  {
    id: 19,
    title: "Pesanan 24 Box - Daging Lada Hitam",
    category: "Rapat/Meeting",
    location: "Gading Serpong",
    pax: 24,
    date: "Meeting Kantor",
    image: "/portofolio/porto-19.jpg",
  },
  {
    id: 20,
    title: "Catering Harian - Udang Sambal Matah",
    category: "Catering Harian",
    location: "Tangerang",
    pax: 6,
    date: "Menu Harian",
    image: "/portofolio/porto-20.jpg",
  },
  {
    id: 21,
    title: "Catering Harian - Tenggiri Balado",
    category: "Catering Harian",
    location: "Jakarta",
    pax: 10,
    date: "Menu Harian",
    image: "/portofolio/porto-21.jpg",
  },
  {
    id: 22,
    title: "Pesanan 23 Box - Cumi Asam Manis",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 23,
    date: "Corporate Event",
    image: "/portofolio/porto-22.jpg",
  },
  {
    id: 23,
    title: "Pesanan 23 Box - Daging Rendang",
    category: "Rapat/Meeting",
    location: "BSD City",
    pax: 23,
    date: "Meeting Kantor",
    image: "/portofolio/porto-23.jpg",
  },
  {
    id: 24,
    title: "Catering Harian - Daging Lada Hitam",
    category: "Catering Harian",
    location: "Tangerang",
    pax: 12,
    date: "Menu Harian",
    image: "/portofolio/porto-24.jpg",
  },
  {
    id: 25,
    title: "Pesanan 18 Box - Ayam Teriyaki",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 18,
    date: "Corporate Event",
    image: "/portofolio/porto-25.jpg",
  },
  {
    id: 26,
    title: "Pesanan 35 Box - Ayam Teriyaki (GIIAS)",
    category: "Corporate",
    location: "ICE BSD",
    pax: 35,
    date: "Pameran",
    image: "/portofolio/porto-26.jpg",
  },
  {
    id: 27,
    title: "Pesanan 30 Box - Ayam Goreng Asin (GIIAS)",
    category: "Corporate",
    location: "ICE BSD",
    pax: 30,
    date: "Pameran",
    image: "/portofolio/porto-27.jpg",
  },
  {
    id: 28,
    title: "Pesanan 35 Box - Ayam Lada Hitam (GIIAS)",
    category: "Corporate",
    location: "ICE BSD",
    pax: 35,
    date: "Pameran",
    image: "/portofolio/porto-28.jpg",
  },
  {
    id: 29,
    title: "Catering Harian - 11 Pax Ayam Teriyaki",
    category: "Catering Harian",
    location: "Gading Serpong",
    pax: 11,
    date: "Menu Harian",
    image: "/portofolio/porto-29.jpg",
  },
  {
    id: 30,
    title: "Pesanan 17 Box - Daging Lada Hitam",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 17,
    date: "Rapat Kantor",
    image: "/portofolio/porto-30.jpg",
  },
  {
    id: 31,
    title: "Pesanan 20 Box - Ikan Tenggiri Balado",
    category: "Rapat/Meeting",
    location: "Gading Serpong",
    pax: 20,
    date: "Meeting",
    image: "/portofolio/porto-31.jpg",
  },
  {
    id: 32,
    title: "Pesanan 38 Box - Ayam Teriyaki",
    category: "Gathering",
    location: "Gading Serpong",
    pax: 38,
    date: "Gathering Komunitas",
    image: "/portofolio/porto-32.jpg",
  },
  {
    id: 33,
    title: "Catering Harian - 10 Pax Ikan Dori Asam Manis",
    category: "Catering Harian",
    location: "Tangerang",
    pax: 10,
    date: "Menu Harian",
    image: "/portofolio/porto-33.jpg",
  },
  {
    id: 34,
    title: "Catering Harian - 10 Pax Ayam Saos Mentega",
    category: "Catering Harian",
    location: "Jakarta",
    pax: 10,
    date: "Menu Harian",
    image: "/portofolio/porto-34.jpg",
  },
  {
    id: 35,
    title: "Catering Harian - 11 Pax Daging Lada Hitam",
    category: "Catering Harian",
    location: "Tangerang",
    pax: 11,
    date: "Menu Harian",
    image: "/portofolio/porto-35.jpg",
  },
  {
    id: 36,
    title: "Catering Harian - 10 Pax Udang Balado",
    category: "Catering Harian",
    location: "Jakarta",
    pax: 10,
    date: "Menu Harian",
    image: "/portofolio/porto-36.jpg",
  },
  {
    id: 37,
    title: "Pesanan 24 Box - Ikan Nila Kremes",
    category: "Gathering",
    location: "Gading Serpong",
    pax: 24,
    date: "Gathering",
    image: "/portofolio/porto-37.jpg",
  },
  {
    id: 38,
    title: "Pesanan 23 Box - Daging Rendang",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 23,
    date: "Meeting",
    image: "/portofolio/porto-38.jpg",
  },
  {
    id: 39,
    title: "Catering Harian - 10 Pax Ayam Kalasan",
    category: "Catering Harian",
    location: "Jakarta",
    pax: 10,
    date: "Menu Harian",
    image: "/portofolio/porto-39.jpg",
  },
  {
    id: 40,
    title: "Pesanan 19 Box - Ayam Sos Mentega",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 19,
    date: "Rapat",
    image: "/portofolio/porto-40.jpg",
  },
  {
    id: 41,
    title: "Pesanan 23 Box - Ayam Goreng",
    category: "Corporate",
    location: "Gading Serpong",
    pax: 23,
    date: "Corporate Event",
    image: "/portofolio/porto-41.jpg",
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredData =
    activeCategory === "Semua"
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <section className="py-12 md:py-20 bg-[#F8F8F8] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#333333] mb-4">
            Momen yang Telah Kami Layani
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Berbagai acara spesial yang telah mempercayakan kebutuhan
            konsumsinya kepada Dapur Srasa.
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
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(item.image)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-[#333333] mb-4 line-clamp-1 group-hover:text-[#005926] transition-colors">
                    {item.title}
                  </h3>
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
            <p className="text-gray-500 text-lg">
              Belum ada portofolio untuk kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-[4/5] md:aspect-square bg-transparent rounded-lg overflow-hidden cursor-default"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <Image
                src={selectedImage}
                alt="Portfolio Full"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
