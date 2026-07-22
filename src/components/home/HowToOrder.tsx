"use client";

import { motion } from "framer-motion";
import { MessageCircle, MessageSquareText, UtensilsCrossed, CheckSquare, ChefHat, Truck, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Hubungi WhatsApp",
    desc: "Klik tombol di bawah untuk langsung terhubung dengan admin Dapur Srasa.",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10",
    border: "border-[#25D366]/20",
  },
  {
    id: 2,
    icon: MessageSquareText,
    title: "Konsultasi Kebutuhan",
    desc: "Ceritakan jenis acara, jumlah porsi, menu yang diinginkan, dan jadwal pengiriman.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    id: 3,
    icon: UtensilsCrossed,
    title: "Pilih Menu",
    desc: "Pilih dari beragam paket menu kami atau request menu khusus sesuai selera.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    id: 4,
    icon: CheckSquare,
    title: "Konfirmasi & Bayar",
    desc: "Konfirmasi pesanan dan lakukan pembayaran DP sesuai kesepakatan bersama.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    id: 5,
    icon: ChefHat,
    title: "Kami Memasak",
    desc: "Tim dapur kami mempersiapkan hidangan dengan bahan segar, higienis, dan penuh cinta.",
    color: "text-[#005926]",
    bg: "bg-[#005926]/10",
    border: "border-[#005926]/20",
  },
  {
    id: 6,
    icon: Truck,
    title: "Diantar Tepat Waktu",
    desc: "Pesanan tiba di lokasi Anda sesuai jadwal. Siap disajikan dan dinikmati!",
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
    border: "border-[#D4AF37]/20",
  },
];

const WA_LINK = "https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20mau%20pesan%20catering!";

export function HowToOrder() {
  return (
    <section className="py-24 bg-[#F8F8F8] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(0,89,38,0.05),transparent)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#005926] text-sm font-bold tracking-widest uppercase mb-3">
            Mudah & Cepat
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            Cara <span className="text-[#005926]">Pemesanan</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Pesan catering berkualitas hanya dalam 6 langkah mudah. Proses cepat, admin responsif!
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className={`group relative bg-white rounded-2xl border ${step.border} p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Step number badge */}
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#005926] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md">
                {step.id}
              </div>

              {/* Icon */}
              <div className={`${step.bg} ${step.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <step.icon className="w-6 h-6" />
              </div>

              {/* Text */}
              <h3 className="font-heading font-bold text-base text-[#1a1a1a] mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

              {/* Arrow connector (not on last of each row) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm">
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-[#005926] to-[#003d1a] rounded-3xl overflow-hidden px-8 py-10 text-center shadow-2xl shadow-[#005926]/30">
            {/* Decoration blobs */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-52 h-52 bg-[#D4AF37]/10 rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
                </span>
                <span className="text-white/80 text-xs font-semibold tracking-wide">Admin Online Sekarang</span>
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-white mb-3">
                Siap Pesan Sekarang?
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Cukup klik tombol di bawah, admin kami siap membantu konsultasi menu dan harga dalam hitungan menit!
              </p>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all hover:scale-105 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat WhatsApp Sekarang
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-white/40 text-xs mt-5">
                Respons dalam &lt; 5 menit · Konsultasi GRATIS · Tidak ada biaya tersembunyi
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
