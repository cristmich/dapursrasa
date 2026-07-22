import { Metadata } from "next";
import { Calendar, MapPin, Clock, CheckCircle2, MessageCircle, Utensils, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/home/CTA";
import Link from "next/link";

const slugify = (text: string) => text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');
function formatArea(area: string) {
  if (!area) return 'Gading Serpong, BSD, Alam Sutera';
  return area.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

type Props = {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const areaName = formatArea(area);
  return {
    title: `Catering Mingguan di ${areaName} | Dapur Srasa`,
    description: `Layanan catering mingguan premium di ${areaName}. Menu rumahan variatif, 100% halal, gratis ongkir. Mulai Rp35.000 per porsi.`,
  };
}

const menuMingguan = [
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

const keunggulan = [
  { icon: Utensils, title: "Menu Berganti Tiap Hari", desc: "Tidak bosan, selalu ada pilihan baru setiap harinya." },
  { icon: CheckCircle2, title: "100% Halal & Higienis", desc: "Dimasak dengan bahan segar dari sumber terpercaya." },
  { icon: Truck, title: "Antar ke Lokasi Anda", desc: "Pengiriman pagi & siang tepat waktu setiap harinya." },
  { icon: Star, title: "Harga Mulai Rp35.000", desc: "Terjangkau tanpa mengorbankan kualitas dan rasa." },
];

export default async function CateringMingguanAreaPage({ params }: Props) {
  const { area } = await params;
  const areaName = formatArea(area);

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#005926] to-[#003818] pt-28 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-4 py-2 text-[#D4AF37] mb-6">
              <Calendar size={16} />
              <span className="text-sm font-semibold tracking-wide">Layanan Berlangganan</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Catering Mingguan <br />
              <span className="text-[#D4AF37] text-3xl md:text-4xl lg:text-5xl mt-2 block">di {areaName}</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Solusi makan harian yang praktis dan lezat untuk Anda di {areaName}. Menu rumahan premium yang berganti setiap harinya, dimasak dengan bahan segar dan higienis.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 text-white/90 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="text-[#D4AF37]" size={16} />
                <span>Pengiriman Spesial {areaName}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-medium">
                <Clock className="text-[#D4AF37]" size={16} />
                <span>Pengiriman Pagi &amp; Siang</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-sm font-medium">
                <MessageCircle className="text-[#D4AF37]" size={16} />
                <span>Admin Responsif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEUNGGULAN ── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {keunggulan.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-[#F8F8F8] hover:bg-[#005926]/5 hover:shadow-sm transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#005926]/10 flex items-center justify-center text-[#005926]">
                  <item.icon size={22} />
                </div>
                <div>
                  <p className="font-bold text-[#333] text-sm leading-snug mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU MINGGUAN ── */}
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
              Jadwal menu dapat berubah sewaktu-waktu sesuai ketersediaan bahan segar terbaik dari pasar.
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
                      <p className="text-white/60 text-xs mt-0.5">4 menu tersedia</p>
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
              Paket Premium Mingguan di {areaName} mulai dari <span className="font-bold text-[#005926]">Rp 199.000 / minggu</span> (Senin–Jumat). Minimal berlangganan 5 hari kerja.
            </p>
            <Button
              render={<a href={`https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20di%20${areaName}%20tertarik%20berlangganan%20Catering%20Mingguan`} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full h-14 px-10 shadow-lg shadow-[#005926]/20 transition-all hover:scale-105 text-base"
            >
              <MessageCircle className="mr-2" size={20} />
              Daftar Langganan Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* ── AREA PENGIRIMAN ── */}
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
              Saat ini kami melayani pengiriman Catering Premium Mingguan untuk area {areaName} dan sekitarnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                nama: "Gading Serpong",
                emoji: "🏙️",
                areas: ["Summarecon", "Paramount", "Modernland", "Kelapa Dua", "Curug"],
                highlight: true,
              },
              {
                nama: "BSD City",
                emoji: "🌆",
                areas: ["BSD Sektor 1–7", "Foresta", "The Icon", "Pagedangan", "Cisauk"],
                highlight: true,
              },
              {
                nama: "Alam Sutera",
                emoji: "🌇",
                areas: ["Alam Sutera", "Serpong Utara", "Pakualam", "Jelupang", "Cipondoh"],
                highlight: true,
              },
            ].map((region, idx) => (
              <div
                key={idx}
                className="relative bg-[#F8F8F8] rounded-2xl border border-gray-100 hover:border-[#005926]/30 hover:shadow-md transition-all p-6"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r from-[#005926] to-[#D4AF37]" />

                <div className="flex items-center gap-3 mb-5 pt-2">
                  <span className="text-3xl">{region.emoji}</span>
                  <Link href={`/catering-mingguan/${slugify(region.nama)}`} className="font-heading font-bold text-xl text-[#1a1a1a] hover:text-[#005926] transition-colors">
                    {region.nama}
                  </Link>
                </div>

                <ul className="space-y-2">
                  {region.areas.map((a, i) => (
                    <li key={i}>
                      <Link href={`/catering-mingguan/${slugify(a)}`} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#005926] hover:font-medium transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#005926] shrink-0" />
                        {a}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Area note + CTA */}
          <div className="mt-10 max-w-2xl mx-auto bg-[#005926]/5 border border-[#005926]/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="text-4xl">📍</div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-bold text-[#1a1a1a] mb-1">Area Anda tidak tercantum?</p>
              <p className="text-sm text-gray-500">Hubungi admin kami untuk konfirmasi jangkauan lokasi Anda. Kami terus memperluas area layanan!</p>
            </div>
            <Button
              render={<a href={`https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20di%20${areaName}%20ingin%20tanya%20jangkauan%20Catering%20Mingguan`} target="_blank" rel="noopener noreferrer" />}
              className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full px-6 shrink-0"
            >
              Tanya Area Saya
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
