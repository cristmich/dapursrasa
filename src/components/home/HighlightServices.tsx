"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarDays, PackageOpen, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "catering-mingguan",
    title: "Catering Mingguan",
    description: "Nikmati menu berbeda setiap minggu dengan masakan rumahan yang lezat, bergizi, dan selalu fresh dikirim langsung ke pintu Anda.",
    icon: CalendarDays,
    image: "/image-catering.png",
    features: [
      "Menu baru setiap minggu",
      "Cocok untuk kantor & keluarga",
      "Dikirim fresh setiap hari",
      "Area Gading Serpong & BSD",
      "Bisa berlangganan bulanan",
    ],
    ctaText: "Lihat Menu Mingguan",
    ctaLink: "/catering-mingguan",
    badge: "Paling Populer",
    accent: "#005926",
    accentLight: "#005926/10",
    highlight: true,
  },
  {
    id: "nasi-box",
    title: "Nasi Box Premium",
    description: "Nasi Box premium mulai Rp 35.000 dengan pilihan menu lengkap. Cocok untuk seminar, arisan, wedding, dan acara korporat.",
    icon: PackageOpen,
    image: "/image-nasibox.png",
    features: [
      "Harga mulai Rp 35.000/box",
      "FREE Ongkir Jabodetabek",
      "Menu dapat di-request",
      "Kemasan eksklusif & rapi",
      "Porsi melimpah & mengenyangkan",
    ],
    ctaText: "Pesan Sekarang",
    ctaLink: "/nasi-box",
    badge: "Terlaris",
    accent: "#D4AF37",
    accentLight: "#D4AF37/10",
    highlight: false,
  },
];

export function HighlightServices() {
  return (
    <section className="py-24 bg-[#F8F8F8] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,89,38,0.06),transparent)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#005926] text-sm font-bold tracking-widest uppercase mb-3">
            Layanan Kami
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            Pilih Layanan yang{" "}
            <span className="text-[#005926]">Tepat untuk Anda</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Solusi konsumsi terlengkap dengan kualitas premium dan rasa yang autentik dari dapur kami.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="group relative"
            >
              <div className={`relative rounded-3xl overflow-hidden flex flex-col h-full border bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${service.highlight ? "border-[#005926]/20 shadow-lg shadow-[#005926]/10" : "border-gray-100 shadow-md"}`}>
                
                {/* Badge */}
                <div className={`absolute top-5 left-5 z-20 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ${service.highlight ? "bg-[#005926] text-white" : "bg-[#D4AF37] text-white"}`}>
                  {service.badge}
                </div>

                {/* Image Section */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 ${service.highlight ? "bg-gradient-to-br from-[#005926]/60 to-transparent" : "bg-gradient-to-br from-[#1a1a1a]/50 to-transparent"}`} />
                  
                  {/* Icon overlaid on image */}
                  <div className="absolute bottom-5 right-5 bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-2xl">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-7 text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${service.highlight ? "bg-[#005926]/10" : "bg-[#D4AF37]/10"}`}>
                          <CheckCircle2 className={`h-4 w-4 ${service.highlight ? "text-[#005926]" : "text-[#D4AF37]"}`} />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    render={<Link href={service.ctaLink} />}
                    className={`w-full h-13 rounded-2xl text-base font-semibold flex items-center justify-center gap-2 transition-all ${service.highlight ? "bg-[#005926] hover:bg-[#004a1f] text-white shadow-md shadow-[#005926]/30 hover:shadow-[#005926]/40" : "bg-[#1a1a1a] hover:bg-[#333] text-white shadow-md"}`}
                  >
                    {service.ctaText}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-10"
        >
          Tidak menemukan yang sesuai?{" "}
          <Link href="/hubungi-kami" className="text-[#005926] font-semibold hover:underline underline-offset-2">
            Hubungi kami untuk paket custom →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
