import { HowToOrder } from "@/components/home/HowToOrder";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { CheckCircle2, MessageCircle, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Order",
  description: "Panduan lengkap dan mudah cara melakukan pemesanan catering harian dan nasi box di Dapur Srasa.",
};

export default function CaraOrderPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#005926] to-[#003818] pt-28 pb-20 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Cara <span className="text-[#D4AF37]">Pemesanan</span>
            </h1>
            <p className="text-xl text-white/90 mb-10">
              Pesan hidangan lezat Anda dalam hitungan menit. Proses yang mudah, cepat, dan transparan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm font-medium">
              <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <MessageCircle className="text-[#D4AF37]" size={18} />
                <span>Konsultasi Gratis</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle2 className="text-[#D4AF37]" size={18} />
                <span>Proses Mudah</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock className="text-[#D4AF37]" size={18} />
                <span>Respons Cepat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowToOrder />
      <FAQ />
      <CTA />
    </>
  );
}
