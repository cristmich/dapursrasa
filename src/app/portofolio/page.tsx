import { Metadata } from "next";
import { Gallery } from "@/components/portofolio/Gallery";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Portofolio | Dapur Srasa",
  description: "Dokumentasi event, acara perusahaan, pernikahan, dan momen spesial lainnya yang telah dilayani oleh Dapur Srasa.",
};

export default function PortofolioPage() {
  return (
    <>
      <div className="bg-[#005926] pt-28 pb-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Portofolio</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Kumpulan momen tak terlupakan yang telah kami lengkapi dengan hidangan istimewa.
          </p>
        </div>
      </div>
      
      <Gallery />
      
      <CTA />
    </>
  );
}
