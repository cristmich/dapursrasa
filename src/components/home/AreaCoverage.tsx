"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const slugify = (text: string) => text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

const regions = [
  { city: "Tangerang Selatan", emoji: "🏡", areas: ["Bintaro", "Serpong", "Pamulang", "Ciputat", "Pondok Aren"] },
  { city: "Tangerang", emoji: "🏙️", areas: ["BSD City", "Gading Serpong", "Alam Sutera", "Karawaci", "Cikupa"] },
  { city: "Jakarta Selatan", emoji: "🏢", areas: ["Kemang", "Kuningan", "SCBD", "Pondok Indah", "Tebet"] },
  { city: "Jakarta Pusat", emoji: "🏛️", areas: ["Menteng", "Sudirman", "Thamrin", "Senayan", "Cempaka Putih"] },
  { city: "Jakarta Barat", emoji: "🌇", areas: ["Puri Indah", "Kebon Jeruk", "Grogol", "Tomang", "Cengkareng"] },
  { city: "Jakarta Utara", emoji: "🌊", areas: ["Kelapa Gading", "PIK", "Pluit", "Sunter", "Ancol"] },
  { city: "Jakarta Timur", emoji: "🏭", areas: ["Rawamangun", "Cawang", "Cibubur", "Duren Sawit", "Pulogadung"] },
  { city: "Depok", emoji: "🌿", areas: ["Margonda", "Cinere", "Sawangan", "Kelapa Dua"] },
  { city: "Bogor", emoji: "⛰️", areas: ["Kota Bogor", "Sentul", "Cibinong", "Baranangsiang"] },
  { city: "Bekasi", emoji: "🏬", areas: ["Kota Bekasi", "Summarecon Bekasi", "Cikarang", "Tambun"] },
];

export function AreaCoverage() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#005926] text-sm font-bold tracking-widest uppercase mb-3">
            Jangkauan Layanan
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            Area <span className="text-[#005926]">Pengiriman</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Kami menjangkau seluruh wilayah Jabodetabek. Nikmati layanan antar gratis khusus untuk pemesanan <span className="font-bold text-[#005926]">minimal 100 box</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {regions.map((region, idx) => (
            <div
              key={idx}
              className="relative bg-[#F8F8F8] rounded-2xl border border-gray-100 hover:border-[#005926]/30 hover:shadow-md transition-all p-5 sm:p-6 flex flex-col h-full group"
            >
              <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r from-[#005926] to-[#005926]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-2 mb-4 pt-2">
                <span className="text-2xl">{region.emoji}</span>
                <Link href={`/${slugify(region.city)}`} className="font-heading font-bold text-base text-[#1a1a1a] hover:text-[#005926] transition-colors">
                  {region.city}
                </Link>
              </div>
              <ul className="space-y-2 flex-1">
                {region.areas.map((area, i) => (
                  <li key={i}>
                    <Link href={`/${slugify(area)}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#005926] hover:font-medium transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#005926] shrink-0" />
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
            <Button
              render={<Link href="/nasi-box" />}
              className="bg-white border-2 border-[#005926] text-[#005926] hover:bg-[#005926] hover:text-white rounded-full h-12 px-8 transition-colors text-base font-semibold"
            >
              Lihat Detail Nasi Box
            </Button>
        </div>
      </div>
    </section>
  );
}
