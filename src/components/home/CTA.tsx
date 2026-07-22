"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[#005926] z-0"></div>
      <div className="absolute inset-0 bg-[url('/cta-image.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Siap Memesan Catering?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Hubungi kami sekarang untuk konsultasi menu dan dapatkan penawaran spesial untuk kebutuhan acara Anda.
            </p>
            
            <Button 
              render={<a href="https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20ingin%20konsultasi%20pesanan%20katering.%20%28Dari%20Bagian%20Bawah%20Beranda%29" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" />}
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20b858] text-white rounded-full text-lg h-16 px-10 shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105"
            >
              <MessageCircle size={24} />
              <span className="font-semibold">Pesan via WhatsApp</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
