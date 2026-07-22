"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMenus, CateringPackage } from "@/lib/firebase/menus";

const defaultMenuMingguan = [
  {
    hari: "Senin",
    emoji: "🍗",
    menu: ["Ayam Bakar Taliwang", "Sayur Asem", "Sambal Terasi", "Lalapan Segar"],
    isOff: false,
  },
  {
    hari: "Selasa",
    emoji: "🥩",
    menu: ["Daging Sapi Lada Hitam", "Capcay Seafood", "Tahu Cabe Garam", "Buah Potong"],
    isOff: false,
  },
  {
    hari: "Rabu",
    emoji: "🐟",
    menu: ["Ikan Gurame Asam Manis", "Tumis Brokoli Jamur", "Perkedel Kentang", "Kerupuk Udang"],
    isOff: false,
  },
  {
    hari: "Kamis",
    emoji: "🍲",
    menu: ["Rendang Daging", "Sayur Daun Singkong", "Sambal Ijo", "Telur Balado"],
    isOff: false,
  },
  {
    hari: "Jumat",
    emoji: "🍚",
    menu: ["Nasi Kuning Komplit", "Ayam Goreng Lengkuas", "Kering Tempe", "Sambal Goreng Ati"],
    isOff: false,
  },
];

export function MenuHarianClient() {
  const [menuMingguan, setMenuMingguan] = useState(defaultMenuMingguan);
  const [period, setPeriod] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenus<CateringPackage>("menus_catering");
        if (data && data.length > 0) {
          // Asumsikan data terakhir adalah yang terbaru
          const latestPackage = data.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
          })[0];

          if (latestPackage && latestPackage.weeklyMenus) {
            setPeriod(latestPackage.period || "");
            
            setMenuMingguan([
              {
                hari: "Senin",
                emoji: "🍗",
                menu: latestPackage.weeklyMenus.senin || [],
                isOff: !latestPackage.weeklyMenus.senin || latestPackage.weeklyMenus.senin.length === 0,
              },
              {
                hari: "Selasa",
                emoji: "🥩",
                menu: latestPackage.weeklyMenus.selasa || [],
                isOff: !latestPackage.weeklyMenus.selasa || latestPackage.weeklyMenus.selasa.length === 0,
              },
              {
                hari: "Rabu",
                emoji: "🐟",
                menu: latestPackage.weeklyMenus.rabu || [],
                isOff: !latestPackage.weeklyMenus.rabu || latestPackage.weeklyMenus.rabu.length === 0,
              },
              {
                hari: "Kamis",
                emoji: "🍲",
                menu: latestPackage.weeklyMenus.kamis || [],
                isOff: !latestPackage.weeklyMenus.kamis || latestPackage.weeklyMenus.kamis.length === 0,
              },
              {
                hari: "Jumat",
                emoji: "🍚",
                menu: latestPackage.weeklyMenus.jumat || [],
                isOff: !latestPackage.weeklyMenus.jumat || latestPackage.weeklyMenus.jumat.length === 0,
              },
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching catering menu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="py-20 bg-[#F8F8F8]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[#005926] text-sm font-bold tracking-widest uppercase mb-3">
            Jadwal Minggu Ini
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            Menu <span className="text-[#005926]">Harian</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">
            {period ? (
              <span className="font-medium text-[#005926]">Periode: {period}</span>
            ) : (
              "Jadwal menu dapat berubah sewaktu-waktu sesuai ketersediaan bahan segar terbaik dari pasar."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {menuMingguan.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                item.isOff
                  ? "border-gray-200 opacity-60"
                  : "border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#005926]/20"
              }`}
            >
              {/* Day header */}
              <div
                className={`px-5 py-4 flex items-center gap-3 ${
                  item.isOff ? "bg-gray-50" : "bg-gradient-to-r from-[#005926] to-[#006d30]"
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className={`font-bold text-lg leading-none ${item.isOff ? "text-gray-400" : "text-white"}`}>
                    {item.hari}
                  </p>
                  {!item.isOff && (
                    <p className="text-white/60 text-xs mt-0.5">{item.menu.length} menu tersedia</p>
                  )}
                </div>
                {!item.isOff && (
                  <div className="ml-auto bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    BUKA
                  </div>
                )}
              </div>

              {/* Menu list */}
              <div className="p-5">
                <ul className="space-y-2.5">
                  {item.menu.map((menuItem, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {!item.isOff ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                      )}
                      <span className={`text-sm leading-snug ${item.isOff ? "text-gray-400 italic" : "text-gray-700"}`}>
                        {menuItem}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 text-sm mb-5">
            Paket Premium Mingguan mulai dari <span className="font-bold text-[#005926]">Rp 199.000 / minggu</span> (Senin–Jumat). Minimal berlangganan 5 hari kerja.
          </p>
          <Button
            render={<a href="https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20tertarik%20berlangganan%20Catering%20Mingguan.%20%28Dari%20Halaman%20Catering%20Mingguan%29" target="_blank" rel="noopener noreferrer" />}
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
