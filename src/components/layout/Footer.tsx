import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#005926] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="mb-4 inline-block">
              <Image src="/logo-white.png" alt="Dapur Srasa Logo" width={150} height={40} className="object-contain h-10 w-auto" />
            </div>
            <p className="text-gray-200 mb-6 text-sm leading-relaxed">
              Catering rumahan premium untuk kantor, event & kebutuhan harian. Melayani area Gading Serpong, BSD, dan Jabodetabek.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/dapursrasa/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#D4AF37] transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@dapur.srasa" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-[#D4AF37] transition-colors" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-[#D4AF37]">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white transition-colors text-sm">Beranda</Link>
              </li>
              <li>
                <Link href="/catering-mingguan" className="text-gray-200 hover:text-white transition-colors text-sm">Catering Mingguan</Link>
              </li>
              <li>
                <Link href="/nasi-box" className="text-gray-200 hover:text-white transition-colors text-sm">Nasi Box</Link>
              </li>
              <li>
                <Link href="/portofolio" className="text-gray-200 hover:text-white transition-colors text-sm">Portofolio</Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="text-gray-200 hover:text-white transition-colors text-sm">Tentang Kami</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-[#D4AF37]">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-gray-200 text-sm">
                  Ruko Sorento Grande West B19<br />
                  Gading Serpong, Tangerang
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#D4AF37] shrink-0" />
                <a href="https://wa.me/62895328596248?text=Halo%20Admin%20Dapur%20Srasa%2C%20saya%20menghubungi%20dari%20Footer%20Website." className="text-gray-200 hover:text-white text-sm transition-colors">
                  +62 895-3285-96248
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#D4AF37] shrink-0" />
                <a href="mailto:dapursrasa@gmail.com" className="text-gray-200 hover:text-white text-sm transition-colors">
                  dapursrasa@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-[#D4AF37]">Jam Operasional</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm text-gray-200 border-b border-white/10 pb-2">
                <span>Senin - Minggu</span>
                <span>07:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Dapur Srasa. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-xs text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-xs text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
