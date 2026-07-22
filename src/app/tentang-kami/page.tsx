import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Tentang Kami | Dapur Srasa",
  description: "Cerita Dapur Srasa dalam menyajikan makanan rumahan berkualitas tinggi dengan pelayanan terbaik untuk Anda.",
};

const misiList = [
  "Mengutamakan kualitas bahan baku yang fresh dan halal.",
  "Menjaga kebersihan dan higienitas dalam setiap proses pengolahan.",
  "Memberikan pelayanan profesional, ramah, dan tepat waktu.",
  "Menjadi partner catering terpercaya untuk berbagai skala acara.",
];

export default function TentangKamiPage() {
  return (
    <>
      <div className="bg-[#005926] pt-28 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-image.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Cerita Dapur Srasa</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Hadir dari kecintaan pada masakan rumahan autentik, kami bertumbuh menjadi penyedia layanan catering yang dipercaya oleh berbagai kalangan.
          </p>
        </div>
      </div>

      <section className="py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
              <Image 
                src="/about-us.png" 
                alt="Dapur Srasa Kitchen"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#F8F8F8]">
              <h2 className="font-heading text-3xl font-bold text-[#005926] mb-4">Visi Kami</h2>
              <p className="text-gray-700 text-lg leading-relaxed italic mb-8 border-l-4 border-[#D4AF37] pl-4">
                "Menyajikan makanan rumahan berkualitas premium dengan pelayanan terbaik untuk menciptakan momen bersantap yang berkesan bagi setiap pelanggan."
              </p>
              
              <h2 className="font-heading text-3xl font-bold text-[#005926] mb-4">Misi Kami</h2>
              <ul className="space-y-4">
                {misiList.map((misi, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#333333]">Dedikasi Pada Rasa</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Setiap menu yang keluar dari dapur kami telah melewati standar pengawasan mutu yang ketat. Mulai dari pemilihan bahan di pasar, proses pembersihan, peracikan bumbu, hingga proses pengemasan.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Kami menyadari bahwa hidangan yang lezat bukan hanya soal rasa, tetapi juga tentang bagaimana makanan tersebut dipersiapkan dengan penuh perhatian, higienis, dan cinta. Itulah yang membuat Dapur Srasa berbeda.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
