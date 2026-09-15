"use client";

import { MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const varianMenu = [
  {
    kategori: "🍗 Ayam",
    warna: { bar: "from-[#005926] to-[#D4AF37]", badge: "bg-green-50 text-green-800 border-green-100", dot: "bg-[#005926]" },
    menu: [
      { nama: "Ayam Saos Mentega", lauk: ["Cah Pakcoy", "Tempe Kecap"] },
      { nama: "Ayam Lada Hitam", lauk: ["Cah Sawi Putih", "Tumis Tauge"] },
      { nama: "Ayam Balado", lauk: ["Bihun", "Tumis Kol"] },
      { nama: "Ayam Teriyaki", lauk: ["Cah Pakcoy", "Jamur Putih"] },
      { nama: "Ayam Goreng Asin", lauk: ["Tumis Bayam", "Tahu & Tempe Goreng + Lalapan"] },
      { nama: "Ayam Goreng Manis", lauk: ["Tumis Bayam", "Tempe & Tahu Goreng + Lalapan"] },
    ],
  },
  {
    kategori: "🐟 Ikan & Dori",
    warna: { bar: "from-blue-400 to-cyan-400", badge: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500" },
    menu: [
      { nama: "Dori Asam Manis", lauk: ["Cah Pakcoy", "Bihun Goreng"] },
      { nama: "Dori Goreng Tepung Sambal Matah", lauk: ["Cah Pakcoy", "Bihun Goreng"] },
      { nama: "Ikan Tenggiri Balado", lauk: ["Cah Kangkung", "Tempe Kecap"] },
      { nama: "Ikan Tenggiri Goreng", lauk: ["Cah Kangkung", "Tempe Kecap"] },
    ],
  },
  {
    kategori: "🥩 Daging",
    warna: { bar: "from-red-500 to-rose-400", badge: "bg-red-50 text-red-700 border-red-100", dot: "bg-red-500" },
    menu: [
      { nama: "Daging Rendang", lauk: ["Cah Kailan", "Tumis Tauge"] },
      { nama: "Daging Teriyaki", lauk: ["Tumis Cuciwis", "Tempe Balado"] },
      { nama: "Daging Lada Hitam", lauk: ["Bihun Goreng", "Tumis Kol"] },
      { nama: "Daging Balado", lauk: ["Tumis Cuciwis", "Tumis Tauge"] },
    ],
  },
  {
    kategori: "🍤 Udang",
    warna: { bar: "from-orange-400 to-amber-400", badge: "bg-orange-50 text-orange-700 border-orange-100", dot: "bg-orange-500" },
    menu: [
      { nama: "Udang Asam Manis", lauk: ["Cah Sawi Putih", "Tempe Balado"] },
      { nama: "Udang Balado", lauk: ["Cah Kangkung", "Bihun Goreng"] },
      { nama: "Udang Goreng Tepung Sambal Matah", lauk: ["Jamur Putih", "Cah Kailan"] },
    ],
  },
];

const sudahTermasuk = [
  "Lauk Utama",
  "2 Lauk Pendamping",
  "Free Sambal",
  "Free Kerupuk",
  "Box Sekat",
];

export function MenuHarianClient() {
  return (
    <section className="py-20 bg-[#F8F8F8]">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-[#005926]/10 text-[#005926] text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">
            Pilihan Menu
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            Varian Menu <span className="text-[#005926]">Catering Mingguan</span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Pilih dari 17 varian lauk utama. Menu dapat dikombinasikan setiap hari agar tidak bosan dan selalu variatif.
          </p>

          {/* Already included badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {sudahTermasuk.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm border border-gray-100"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#005926]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="space-y-10 max-w-7xl mx-auto">
          {varianMenu.map((kategori, ki) => (
            <div key={ki}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-sm font-bold px-3 py-1 rounded-full border ${kategori.warna.badge}`}>
                  {kategori.kategori}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">{kategori.menu.length} menu</span>
              </div>

              {/* Menu cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {kategori.menu.map((item, mi) => (
                  <div
                    key={mi}
                    className="bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden flex flex-col group"
                  >
                    {/* Color accent bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${kategori.warna.bar}`} />

                    <div className="p-4 flex flex-col flex-1">
                      {/* Main dish name */}
                      <p className="font-semibold text-[#333] text-sm leading-snug mb-3">
                        {item.nama}
                      </p>

                      {/* Divider */}
                      <div className="border-t border-dashed border-gray-100 mb-3" />

                      {/* Side dishes */}
                      <div className="flex-1 space-y-1.5">
                        {item.lauk.map((l, li) => (
                          <div key={li} className="flex items-start gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${kategori.warna.dot}`} />
                            <span className="text-xs text-gray-500 leading-snug">{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info + CTA */}
        <div className="mt-14 max-w-2xl mx-auto text-center">
          <div className="bg-white border border-[#005926]/15 rounded-2xl p-6 mb-6 shadow-sm">
            <p className="text-sm text-gray-500 leading-relaxed">
              Menu dikombinasikan setiap hari oleh tim Dapur Srasa agar selalu variatif dan tidak membosankan.
              Berlangganan mulai{" "}
              <span className="font-bold text-[#005926]">5 hari kerja (Senin–Jumat)</span>. Harga mulai{" "}
              <span className="font-bold text-[#005926]">Rp 199.000/pax</span>.
            </p>
          </div>
          <Button
            render={
              <a
                href="https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20tertarik%20berlangganan%20Catering%20Mingguan.%20%28Dari%20Halaman%20Catering%20Mingguan%29"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="lg"
            className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full h-14 px-10 shadow-lg shadow-[#005926]/20 transition-all hover:scale-105 text-base"
          >
            <MessageCircle className="mr-2" size={20} />
            Daftar Langganan Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
}
