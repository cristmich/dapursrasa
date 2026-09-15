import { allAreaSlugs } from "@/app/sitemap";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allAreaSlugs.map((area) => ({ area }));
}

import { Metadata } from "next";
import { CheckCircle2, Truck, HandPlatter, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/home/CTA";
import Link from "next/link";

const slugify = (text: string) => text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

function formatArea(area: string) {
  if (!area) return 'Jabodetabek';
  return area.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

type Props = {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const areaName = formatArea(area);
  const url = `https://dapursrasa.com/nasi-box/${area}`;
  return {
    title: `Nasi Box Premium di ${areaName} - Mulai Rp30.000 | Dapur Srasa`,
    description: `Pesan nasi box premium untuk area ${areaName} dan sekitarnya. Cocok untuk acara kantor, syukuran, & seminar. Mulai Rp30.000, higienis & lezat.`,
    keywords: [
      `nasi box ${areaName.toLowerCase()}`,
      `nasi kotak ${areaName.toLowerCase()}`,
      `pesan nasi box ${areaName.toLowerCase()}`,
      `catering nasi box ${areaName.toLowerCase()}`,
      "nasi box premium",
      "nasi kotak murah",
      "catering acara",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Nasi Box Premium di ${areaName} - Mulai Rp30.000 | Dapur Srasa`,
      description: `Nasi box premium untuk area ${areaName}. Berbagai pilihan menu mulai Rp30.000. Higienis, lezat, kemasan elegan.`,
      url,
      images: [{ url: "https://dapursrasa.com/meta-image.png", width: 1200, height: 630, alt: `Nasi Box Dapur Srasa di ${areaName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Nasi Box Premium di ${areaName} | Dapur Srasa`,
      description: `Pesan nasi box untuk area ${areaName} dan sekitarnya. Mulai Rp30.000, 100% halal.`,
      images: ["https://dapursrasa.com/meta-image.png"],
    },
  };
}

const paketNasiBox = [
  { nama: "MENU 1", harga: "Rp 30.000", menu: ["Nasi Putih", "Ayam Saos Mentega", "Cah Pakcoy", "Tempe Kecap", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 2", harga: "Rp 30.000", menu: ["Nasi Putih", "Ayam Lada Hitam", "Cah Sawi Putih", "Tumis Tauge", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 3", harga: "Rp 30.000", menu: ["Nasi Putih", "Ayam Balado", "Bihun", "Tumis Kol", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 4", harga: "Rp 30.000", menu: ["Nasi Putih", "Ayam Teriyaki", "Cah Pakcoy", "Jamur Putih", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 5", harga: "Rp 35.000", menu: ["Nasi Putih", "Ayam Goreng Asin", "Tumis Bayam", "Tahu dan Tempe Goreng + Lalapan", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 6", harga: "Rp 35.000", menu: ["Nasi Putih", "Ayam Goreng Manis", "Tumis Bayam", "Tempe dan Tahu Goreng + Lalapan", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 7", harga: "Rp 30.000", menu: ["Nasi Putih", "Dori Asam Manis", "Cah Pakcoy", "Bihun Goreng", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 8", harga: "Rp 30.000", menu: ["Nasi Putih", "Dori Goreng Tepung Sambal Matah", "Cah Pakcoy", "Bihun Goreng", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 9", harga: "Rp 34.000", menu: ["Nasi Putih", "Ikan Tenggiri Balado", "Cah Kangkung", "Tempe Kecap", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 10", harga: "Rp 34.000", menu: ["Nasi Putih", "Ikan Tenggiri Goreng", "Cah Kangkung", "Tempe Kecap", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 11", harga: "Rp 32.000", menu: ["Nasi Putih", "Daging Rendang", "Cah Kailan", "Tumis Tauge", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 12", harga: "Rp 32.000", menu: ["Nasi Putih", "Daging Teriyaki", "Tumis Cuciwis", "Tempe Balado", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 13", harga: "Rp 32.000", menu: ["Nasi Putih", "Daging Lada Hitam", "Bihun Goreng", "Tumis Kol", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 14", harga: "Rp 32.000", menu: ["Nasi Putih", "Daging Balado", "Tumis Cuciwis", "Tumis Tauge", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 15", harga: "Rp 32.000", menu: ["Nasi Putih", "Udang Asam Manis", "Cah Sawi Putih", "Tempe Balado", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 16", harga: "Rp 32.000", menu: ["Nasi Putih", "Udang Balado", "Cah Kangkung", "Bihun Goreng", "Free Sambal", "Free Kerupuk"] },
  { nama: "MENU 17", harga: "Rp 32.000", menu: ["Nasi Putih", "Udang Goreng Tepung Sambal Matah", "Jamur Putih", "Cah Kailan", "Free Sambal", "Free Kerupuk"] },
];

const kategoriAcara = [
  "Corporate Event", "Seminar & Workshop", "Gathering", "Rapat Kantoran", "Arisan Keluarga", "Ulang Tahun", "Wedding / Lamaran", "Syukuran", "Pengajian"
];

export default async function NasiBoxAreaPage({ params }: Props) {
  const { area } = await params;
  const areaName = formatArea(area);

  return (
    <>
      {/* JSON-LD Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "name": "Dapur Srasa - Nasi Box",
            "url": "https://dapursrasa.com/nasi-box",
            "telephone": "+6289532859624",
            "servesCuisine": ["Indonesian", "Catering"],
            "priceRange": "Rp30.000 - Rp35.000",
            "areaServed": ["Tangerang", "Tangerang Selatan", "Jakarta", "Depok", "Bogor", "Bekasi", "Jabodetabek"],
            "hasMenuItem": paketNasiBox.map((paket) => ({
              "@type": "MenuItem",
              "name": paket.nama,
              "description": paket.menu.filter(m => !m.startsWith("Free") && m !== "Nasi Putih").join(", "),
              "offers": {
                "@type": "Offer",
                "price": paket.harga.replace("Rp ", "").replace(".", ""),
                "priceCurrency": "IDR",
              },
            })),
            "sameAs": [
              "https://www.instagram.com/dapursrasa/",
              "https://www.tiktok.com/@dapur.srasa"
            ],
          })
        }}
      />

      <section className="bg-gradient-to-br from-[#005926] to-[#003818] pt-28 pb-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nasi Box Premium di {areaName} <br /> Mulai <span className="text-[#D4AF37]">Rp 30.000</span>
            </h1>
            <p className="text-xl text-white/90 mb-10">
              Sajian lezat, kemasan elegan, dan pelayanan profesional untuk mensukseskan acara Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm font-medium">
              <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Truck className="text-[#D4AF37]" size={18} />
                <span>FREE Ongkir Jabodetabek*</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <HandPlatter className="text-[#D4AF37]" size={18} />
                <span>Menu Bisa Request</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <PartyPopper className="text-[#D4AF37]" size={18} />
                <span>Untuk Berbagai Acara</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 md:px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block bg-[#005926]/10 text-[#005926] text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">Menu Tersedia</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#333333] mb-4">Pilihan Menu Nasi Box untuk {areaName}</h2>
            <p className="text-lg font-medium text-[#005926] mb-6">Praktis • Lezat • Berkualitas</p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#005926]" /> Nasi Putih
              </span>
              <span className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#005926]" /> Box Sekat
              </span>
              <span className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#005926]" /> Free Sambal
              </span>
              <span className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-[#005926]" /> Free Kerupuk
              </span>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {paketNasiBox.map((paket, index) => {
              // Determine category color based on lauk utama
              const mainItem = paket.menu[1] ?? "";
              const isAyam = mainItem.toLowerCase().includes("ayam");
              const isDori = mainItem.toLowerCase().includes("dori");
              const isIkan = mainItem.toLowerCase().includes("ikan") || isDori;
              const isDaging = mainItem.toLowerCase().includes("daging");
              const isUdang = mainItem.toLowerCase().includes("udang");

              const accent = isDaging
                ? { bar: "from-red-500 to-rose-400", badge: "bg-red-50 text-red-700 border-red-100", label: "🥩 Daging" }
                : isUdang
                ? { bar: "from-orange-400 to-amber-400", badge: "bg-orange-50 text-orange-700 border-orange-100", label: "🍤 Udang" }
                : isIkan
                ? { bar: "from-blue-400 to-cyan-400", badge: "bg-blue-50 text-blue-700 border-blue-100", label: "🐟 Ikan" }
                : { bar: "from-[#005926] to-[#D4AF37]", badge: "bg-green-50 text-green-800 border-green-100", label: "🍗 Ayam" };

              // Separate main items from free items
              const mainItems = paket.menu.filter(m => !m.startsWith("Free") && m !== "Nasi Putih");
              const freeItems = paket.menu.filter(m => m.startsWith("Free"));

              return (
                <div key={index} className="relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
                  {/* Top accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${accent.badge} mb-2 inline-block`}>
                          {accent.label}
                        </span>
                        <h3 className="font-heading font-bold text-[#333333] text-lg leading-tight">{paket.nama}</h3>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="font-heading font-bold text-[#005926] text-xl">{paket.harga}</div>
                        <div className="text-xs text-gray-400">/porsi</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-100 mb-4" />

                    {/* Menu items */}
                    <div className="flex-1 space-y-2 mb-4">
                      {/* Nasi Putih */}
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                        <span className="text-sm text-gray-400">Nasi Putih</span>
                      </div>
                      {/* Main items */}
                      {mainItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-br ${accent.bar}`} />
                          <span className="text-sm text-gray-700 font-medium leading-snug">{item}</span>
                        </div>
                      ))}
                      {/* Free items */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {freeItems.map((item, i) => (
                          <span key={i} className="text-xs bg-[#005926]/8 text-[#005926] font-medium px-2 py-0.5 rounded-full border border-[#005926]/15">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Order Button */}
                    <Button
                      render={<a href={`https://wa.me/62895328596248?text=Halo%20Admin%20Srasa,%20saya%20mau%20pesan%20Nasi%20Box%20${paket.nama}%20-%20${paket.harga}`} target="_blank" rel="noopener noreferrer" />}
                      className="w-full rounded-full bg-[#005926] hover:bg-[#004a1f] text-white text-sm h-10 group-hover:scale-[1.02] transition-transform"
                    >
                      Pesan Sekarang
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <p className="text-center text-sm text-gray-400 mt-10">
            * Semua menu sudah termasuk Nasi Putih, Free Sambal & Free Kerupuk. Minimum order 10 box.
          </p>

        </div>
      </section>


      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-[#333333] mb-8">Cocok Untuk Berbagai Kebutuhan</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {kategoriAcara.map((kategori, i) => (
                <span key={i} className="bg-[#F8F8F8] text-gray-700 border border-gray-200 px-6 py-3 rounded-full text-sm font-medium hover:border-[#005926] hover:text-[#005926] transition-colors cursor-default">
                  {kategori}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SAMPLE NASI BOX ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-[#005926]/10 text-[#005926] text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">
              Tampilan Produk
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 leading-tight">
              Nasi Box <span className="text-[#005926]">Dapur Srasa</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Kemasan rapi, higienis, dan menarik. Dilengkapi box sekat agar makanan tidak bercampur dan tetap fresh saat diterima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            <div className="relative rounded-2xl overflow-hidden shadow-md group aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sample-nasi-box-1.jpg" alt="Nasi Box Dapur Srasa - Selamat Menikmati" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">✨ Kemasan Branded</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-md group aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sample-nasi-box-2.jpg" alt="Nasi Box Dapur Srasa - Indonesian Foods Premium" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">👑 Kemasan Premium</span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: "📦", label: "Box Sekat", desc: "Makanan tidak bercampur" },
              { icon: "🌶️", label: "Free Sambal", desc: "Sudah termasuk" },
              { icon: "🍘", label: "Free Kerupuk", desc: "Sudah termasuk" },
              { icon: "🍚", label: "Nasi Putih", desc: "Porsi pas & mengenyangkan" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#F8F8F8] rounded-xl px-4 py-3 border border-gray-100">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <p className="text-sm font-bold text-[#333]">{f.label}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              render={<a href={`https://wa.me/62895328596248?text=Halo%20Admin%20Srasa,%20saya%20di%20${areaName}%20mau%20pesan%20Nasi%20Box.%20Boleh%20minta%20info%20lebih%20lanjut%3F`} target="_blank" rel="noopener noreferrer" />}
              className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full px-10 h-12 text-base transition-all hover:scale-105 shadow-md shadow-[#005926]/20"
            >
              Pesan Nasi Box Sekarang
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 md:px-6">

          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-[#005926] text-sm font-bold tracking-widest uppercase mb-3">
              Jangkauan Pengiriman
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
              Area <span className="text-[#005926]">Gratis Ongkir*</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Kami menjangkau seluruh wilayah Jabodetabek, termasuk {areaName}. Nikmati layanan antar gratis khusus untuk pemesanan <span className="font-bold text-[#005926]">minimal 100 box</span>.
            </p>
          </div>

          {/* City cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
            {[
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
            ].map((region, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl border border-gray-100 hover:border-[#005926]/30 hover:shadow-md transition-all duration-300 p-5 flex flex-col"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-5 right-5 h-[3px] rounded-b-full bg-gradient-to-r from-[#005926] to-[#D4AF37]" />

                {/* City name + emoji */}
                <div className="flex items-center gap-2 mb-4 pt-2">
                  <span className="text-2xl">{region.emoji}</span>
                  <Link href={`/nasi-box/${slugify(region.city)}`} className="font-heading font-bold text-base text-[#1a1a1a] hover:text-[#005926] transition-colors">
                    {region.city}
                  </Link>
                </div>

                {/* Area list */}
                <ul className="space-y-2 flex-1">
                  {region.areas.map((area, i) => (
                    <li key={i}>
                      <Link href={`/nasi-box/${slugify(area)}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#005926] hover:font-medium transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#005926] shrink-0" />
                        {area}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Note + CTA banner */}
          <div className="mt-10 max-w-3xl mx-auto bg-white border border-[#005926]/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
            <div className="text-4xl shrink-0">📍</div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-bold text-[#1a1a1a] mb-1">Area Anda tidak tercantum?</p>
              <p className="text-sm text-gray-500">
                *Gratis ongkir berlaku untuk minimum pemesanan 100 box. Hubungi admin kami untuk konfirmasi jangkauan lokasi Anda.
              </p>
            </div>
            <Button
              render={<a href="https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20ingin%20bertanya%20apakah%20area%20%5BNAMA%20AREA%5D%20masuk%20jangkauan%20pengiriman%20Nasi%20Box%3F" target="_blank" rel="noopener noreferrer" />}
              className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full px-6 shrink-0 transition-all hover:scale-105"
            >
              Tanya Area Saya
            </Button>
          </div>

        </div>
      </section>

      {/* Download Catalog Section */}
      <section className="py-20 bg-gradient-to-br from-[#005926] to-[#003818] relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">

            {/* Catalog preview */}
            <div className="shrink-0 relative group">
              <div className="absolute -inset-3 bg-[#D4AF37]/20 rounded-3xl blur-xl group-hover:bg-[#D4AF37]/30 transition-all duration-500" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 w-64 md:w-72">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/katalog-nasi-box.jpg"
                  alt="Katalog Nasi Box Dapur Srasa"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="bg-[#D4AF37] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Katalog 2024
                  </span>
                </div>
              </div>
            </div>

            {/* Text + CTA */}
            <div className="text-white text-center lg:text-left">
              <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-4">
                📄 Download Gratis
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Download Katalog <br />
                <span className="text-[#D4AF37]">Menu Nasi Box</span>
              </h2>
              <p className="text-white/70 text-base mb-4 leading-relaxed max-w-md mx-auto lg:mx-0">
                Dapatkan daftar lengkap 17 menu nasi box Dapur Srasa dalam format gambar yang siap dibagikan. Cocok untuk referensi pemesanan atau dikirim ke rekan Anda.
              </p>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-white/70 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 17 Pilihan Menu</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Info Harga Lengkap</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Kualitas Gambar Tinggi</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  render={<a href="/katalog-nasi-box.jpg" download="Katalog-Nasi-Box-Dapur-Srasa.jpg" />}
                  className="bg-[#D4AF37] hover:bg-[#c4a030] text-[#1a1a1a] font-bold rounded-full px-8 h-12 text-base transition-all hover:scale-105 shadow-lg"
                >
                  ⬇️ Download Katalog
                </Button>
                <Button
                  render={<a href="https://wa.me/62895328596248?text=Halo%20Admin%20Srasa,%20saya%20mau%20pesan%20Nasi%20Box.%20Boleh%20minta%20katalog%20menu%3F" target="_blank" rel="noopener noreferrer" />}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-8 h-12 text-base transition-all"
                >
                  💬 Tanya via WhatsApp
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTA />

    </>
  );
}
