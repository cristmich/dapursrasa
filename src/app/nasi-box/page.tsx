import { Metadata } from "next";
import { CheckCircle2, Truck, HandPlatter, PartyPopper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Nasi Box Termurah di Tangerang & Jakarta | Dapur Srasa",
  description: "Pesan Nasi Box termurah No 1 di BSD, Gading Serpong, Alam Sutera, Tangerang, dan Jakarta. Harga mulai Rp35.000, 100% halal, lezat, dan Gratis Ongkir Jabodetabek.",
};

const paketNasiBox = [
  {
    nama: "Paket Hemat",
    harga: "Rp 35.000",
    deskripsi: "Pilihan tepat untuk acara santai dengan budget bersahabat tanpa mengorbankan rasa.",
    menu: ["Nasi Putih", "Ayam (Bakar/Goreng/Kecap)", "Sayur / Tumisan", "Sambal & Lalapan", "Kerupuk", "Air Mineral"],
  },
  {
    nama: "Paket Spesial",
    harga: "Rp 45.000",
    deskripsi: "Paket favorit dengan tambahan lauk pendamping untuk variasi rasa yang lebih kaya.",
    menu: ["Nasi Putih / Nasi Kuning", "Daging (Rendang/Lada Hitam) / Ayam", "Sayur / Tumisan Premium", "Lauk Pendamping (Perkedel/Tahu/Tempe)", "Sambal & Lalapan", "Kerupuk & Air Mineral", "Buah Potong"],
    populer: true,
  },
  {
    nama: "Paket Premium",
    harga: "Rp 55.000+",
    deskripsi: "Sajian mewah untuk acara spesial Anda dengan porsi melimpah dan kemasan eksklusif.",
    menu: ["Nasi Spesial (Liwet/Kuning/Uduk)", "2 Macam Lauk Utama (Daging & Ayam/Ikan)", "Sayur Premium", "2 Lauk Pendamping", "Sambal, Lalapan & Kerupuk", "Air Mineral & Dessert / Pudding", "Buah Segar"],
  },
];

const kategoriAcara = [
  "Corporate Event", "Seminar & Workshop", "Gathering", "Rapat Kantoran", "Arisan Keluarga", "Ulang Tahun", "Wedding / Lamaran", "Syukuran", "Pengajian"
];

export default function NasiBoxPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#005926] to-[#003818] py-24 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nasi Box Premium <br /> Mulai <span className="text-[#D4AF37]">Rp 35.000</span>
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
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#333333] mb-4">Pilihan Paket Nasi Box</h2>
            <p className="text-gray-600">Sesuaikan dengan budget dan kebutuhan acara Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {paketNasiBox.map((paket, index) => (
              <Card key={index} className={`relative flex flex-col h-full ${paket.populer ? 'border-[#005926] border-2 shadow-lg transform md:-translate-y-4' : 'border-gray-100 shadow-sm'}`}>
                {paket.populer && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#005926] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Paling Diminati
                  </div>
                )}
                <CardHeader className="text-center pb-6 border-b border-gray-100 bg-gray-50/50 rounded-t-xl pt-8">
                  <CardTitle className="font-heading text-2xl text-[#333333] mb-2">{paket.nama}</CardTitle>
                  <div className="font-heading text-3xl font-bold text-[#005926] mb-3">{paket.harga}</div>
                  <CardDescription className="text-gray-600">{paket.deskripsi}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow">
                  <ul className="space-y-3">
                    {paket.menu.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6 pb-8">
                  <Button render={<a href={`https://wa.me/62895328596248?text=Halo%20Admin%20Srasa,%20saya%20tertarik%20dengan%20Nasi%20Box%20${paket.nama}`} target="_blank" rel="noopener noreferrer" />} className={`w-full rounded-full h-12 ${paket.populer ? 'bg-[#005926] hover:bg-[#004a1f] text-white' : 'bg-gray-100 text-[#333333] hover:bg-gray-200'}`}>
                    Pesan {paket.nama}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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

      <section className="py-20 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#333333] mb-4">Area Pengiriman (Gratis Ongkir*)</h2>
            <p className="text-gray-600">Kami menjangkau seluruh wilayah Jabodetabek. Nikmati layanan antar gratis untuk pesanan dalam jumlah tertentu.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { city: "Tangerang", areas: ["BSD City", "Gading Serpong", "Alam Sutera", "Bintaro", "Cikupa"] },
              { city: "Jakarta", areas: ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"] },
              { city: "Depok", areas: ["Margonda", "Cibubur", "Cinere", "Sawangan"] },
              { city: "Bogor", areas: ["Kota Bogor", "Sentul", "Cibinong"] },
              { city: "Bekasi", areas: ["Kota Bekasi", "Cikarang", "Tambun"] }
            ].map((region, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#005926]/30 transition-all">
                <h3 className="font-bold text-[#005926] mb-4 text-lg border-b border-gray-100 pb-2">{region.city}</h3>
                <ul className="space-y-2">
                  {region.areas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
             <p className="text-sm text-gray-500 italic mb-4">
               *Gratis ongkir berlaku dengan minimum pemesanan. <br className="md:hidden" /> Area Anda tidak tercatat di atas? Jangan khawatir!
             </p>
             <Button 
               render={<a href="https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20ingin%20bertanya%20apakah%20area%20%5BNAMA%20AREA%5D%20masuk%20jangkauan%20pengiriman%20Nasi%20Box%3F" target="_blank" rel="noopener noreferrer" />} 
               variant="outline"
               className="rounded-full border-[#005926] text-[#005926] hover:bg-[#005926] hover:text-white transition-colors"
             >
               Tanya Jangkauan Area
             </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
