import { Metadata } from "next";
import { Calendar, MapPin, Clock, ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Catering Mingguan | Dapur Srasa",
  description: "Layanan catering mingguan dengan menu rumahan variatif untuk area Gading Serpong, BSD, dan sekitarnya.",
};

const menuMingguan = [
  { hari: "Senin", menu: ["Ayam Bakar Taliwang", "Sayur Asem", "Sambal Terasi", "Lalapan Segar"] },
  { hari: "Selasa", menu: ["Daging Sapi Lada Hitam", "Capcay Seafood", "Tahu Cabe Garam", "Buah Potong"] },
  { hari: "Rabu", menu: ["Ikan Gurame Asam Manis", "Tumis Brokoli Jamur", "Perkedel Kentang", "Kerupuk Udang"] },
  { hari: "Kamis", menu: ["Rendang Daging", "Sayur Daun Singkong", "Sambal Ijo", "Telur Balado"] },
  { hari: "Jumat", menu: ["Nasi Kuning Komplit", "Ayam Goreng Lengkuas", "Kering Tempe", "Sambal Goreng Ati"] },
  { hari: "Sabtu", menu: ["Soto Betawi", "Emping", "Acar Kuning", "Perkedel"] },
  { hari: "Minggu", menu: ["Libur", "Pengiriman Off", "-", "-"] },
];

export default function CateringMingguanPage() {
  return (
    <>
      <div className="bg-[#F8F8F8] py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 px-4 py-2 text-[#D4AF37] mb-6">
              <Calendar size={18} />
              <span className="text-sm font-semibold">Layanan Berlangganan</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#333333] mb-6">Catering Mingguan</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Solusi praktis untuk kebutuhan makan sehari-hari. Nikmati hidangan rumahan premium yang berganti setiap harinya, dimasak dengan bahan segar dan higienis.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                <MapPin className="text-[#005926]" size={20} />
                <span className="text-sm font-medium">Gading Serpong & BSD</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                <Clock className="text-[#005926]" size={20} />
                <span className="text-sm font-medium">Pengiriman Pagi & Siang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#333333] mb-4">Menu Minggu Ini</h2>
            <p className="text-gray-600">Jadwal menu dapat berubah sewaktu-waktu sesuai ketersediaan bahan segar terbaik.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuMingguan.map((item, index) => (
              <Card key={index} className={`border-t-4 shadow-sm ${item.hari === "Minggu" ? "border-t-gray-300 opacity-60" : "border-t-[#005926] hover:shadow-md transition-shadow"}`}>
                <CardHeader className="pb-4">
                  <CardTitle className="font-heading text-xl text-[#333333]">{item.hari}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {item.menu.map((menuItem, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {item.hari !== "Minggu" && <Utensils className="h-4 w-4 text-[#D4AF37] shrink-0 mt-1" />}
                        <span className="text-gray-700 text-sm">{menuItem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
             <Button render={<a href="https://wa.me/62895328596248?text=Halo%20Admin%20Srasa,%20saya%20mau%20berlangganan%20catering%20mingguan" target="_blank" rel="noopener noreferrer" />} size="lg" className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-full">
                  Daftar Langganan Sekarang
              </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
