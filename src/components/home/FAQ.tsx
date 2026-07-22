"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Apakah ada minimum order untuk pemesanan Nasi Box?",
    answer: "Untuk Gratis Ongkir, minimum order adalah 100 box. Kami menjangkau seluruh wilayah Jabodetabek. Jika di bawah minimum order, tetap bisa kami layani dengan tambahan ongkos kirim sesuai jarak."
  },
  {
    question: "Berapa lama maksimal pemesanan (H-?) harus dilakukan?",
    answer: "Kami sangat menyarankan pemesanan dilakukan maksimal H-1 sebelum jam 15.00 WIB. Namun untuk pesanan besar (>100 pax), harap lakukan pemesanan minimal H-3 agar kami dapat mempersiapkan bahan baku terbaik."
  },
  {
    question: "Apakah menu Catering Mingguan bisa di-custom?",
    answer: "Tentu bisa! Jika ada pantangan makanan (misalnya alergi seafood, tidak suka pedas, dsb), Anda dapat menyampaikannya saat pemesanan. Kami akan menyesuaikan porsi Anda."
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Setelah pesanan dan menu disepakati, kami akan mengirimkan invoice/tagihan. Anda diwajibkan membayar Down Payment (DP) minimal 50% agar pesanan masuk ke jadwal produksi kami. Sisa pembayaran dapat dilunasi maksimal pada hari pengiriman."
  },
  {
    question: "Apakah Dapur Srasa terjamin kebersihan dan kehalalannya?",
    answer: "100% terjamin! Kami hanya menggunakan bahan-bahan segar berkualitas tinggi dan halal. Proses memasak juga dilakukan di dapur higienis berstandar profesional."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#005926] text-sm font-bold tracking-widest uppercase mb-3">
            Pertanyaan Umum
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            FAQ <span className="text-[#005926]">Pemesanan</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Jawaban untuk beberapa pertanyaan yang paling sering diajukan oleh pelanggan kami.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#005926] shadow-md shadow-[#005926]/5" : "border-gray-200 hover:border-[#005926]/40"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between bg-white focus:outline-none"
                >
                  <span className={`font-semibold text-lg pr-4 ${isOpen ? "text-[#005926]" : "text-[#333]"}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#005926]/10 text-[#005926]" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-gray-500 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
