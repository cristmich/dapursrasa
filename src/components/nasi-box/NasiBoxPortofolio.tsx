"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { portfolioData } from "@/components/portofolio/Gallery";

const sizePattern = [
  "large",
  "medium",
  "small",
  "small",
  "small",
  "small",
  "large",
  "medium",
  "small",
  "small",
];

export function NasiBoxPortofolio() {
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    // Filter out "Catering Harian" and "Buffet Wedding" as they are not Nasi Box
    const nasiBoxData = portfolioData.filter(
      (item) =>
        !item.category.includes("Catering Harian") &&
        !item.category.includes("Buffet Wedding"),
    );

    // Shuffle the filtered portfolio data
    const shuffled = [...nasiBoxData].sort(() => 0.5 - Math.random());

    // Take the first 10 items and map them to the size pattern
    const selected = shuffled.slice(0, 10).map((item, index) => ({
      ...item,
      size: sizePattern[index],
    }));

    setGallery(selected);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-[#005926]/10 text-[#005926] text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">
            Galeri Pesanan
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 leading-tight">
            Portofolio Pesanan <span className="text-[#005926]">Nasi Box</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Kepercayaan ribuan pelanggan, mulai dari acara kantor, pabrik,
            hingga event besar.
          </p>
        </div>

        {gallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:grid-flow-row-dense">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id + "-" + index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden group ${
                  item.size === "large"
                    ? "md:col-span-2 md:row-span-2"
                    : item.size === "medium"
                      ? "md:col-span-1 md:row-span-2"
                      : "md:col-span-1 md:row-span-1"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-white font-heading font-semibold text-lg">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:grid-flow-row-dense">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`bg-gray-200 rounded-2xl animate-pulse ${
                  sizePattern[index] === "large"
                    ? "md:col-span-2 md:row-span-2"
                    : sizePattern[index] === "medium"
                      ? "md:col-span-1 md:row-span-2"
                      : "md:col-span-1 md:row-span-1"
                }`}
              ></div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="/portofolio"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#005926] text-white font-medium rounded-full hover:bg-[#00471e] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
          >
            Lihat Semua Portofolio
          </a>
        </div>
      </div>
    </section>
  );
}
