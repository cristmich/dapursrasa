import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Hubungi Kami | Dapur Srasa",
  description: "Hubungi Dapur Srasa untuk pemesanan catering mingguan, nasi box, atau konsultasi kebutuhan event Anda.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Alamat Dapur",
    content: "Ruko Sorento Grande West B19, Gading Serpong, Tangerang, Banten",
    link: "https://maps.app.goo.gl/dapursrasa",
    color: "text-[#005926]",
    bg: "bg-[#005926]/10",
  },
  {
    icon: Phone,
    label: "WhatsApp / Telepon",
    content: "+62 895-3285-96248",
    link: "https://wa.me/62895328596248",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10",
  },
  {
    icon: Mail,
    label: "Email",
    content: "dapursrasa@gmail.com",
    link: "mailto:dapursrasa@gmail.com",
    color: "text-[#005926]",
    bg: "bg-[#005926]/10",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    content: "Senin – Minggu: 07:00–17:00",
    link: null,
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10",
  },
];

export default function HubungiKamiPage() {
  return (
    <>
      {/* ── HERO HEADER ── */}
      <div className="relative bg-gradient-to-br from-[#005926] to-[#003818] pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">Konsultasi Gratis</span>
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Kami Siap Membantu Anda
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed">
            Ceritakan kebutuhan acara Anda. Tim kami akan merespons dalam waktu kurang dari 1 jam di hari kerja.
          </p>
        </div>
      </div>

      {/* ── CONTACT CARDS ROW (overlap the header) ── */}
      <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map(({ icon: Icon, label, content, link, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow">
              <div className={`${bg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className={`${color} w-6 h-6`} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{label}</p>
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className={`font-semibold text-[#1a1a1a] hover:${color} transition-colors text-sm leading-relaxed whitespace-pre-line`}>
                    {content}
                  </a>
                ) : (
                  <p className="font-semibold text-[#1a1a1a] text-sm leading-relaxed whitespace-pre-line">{content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FORM + MAP SECTION ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

            {/* Form Card */}
            <div className="bg-[#F8F8F8] rounded-3xl p-8 md:p-10 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#005926] p-2.5 rounded-xl">
                  <MessageCircle className="text-white w-5 h-5" />
                </div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Kirim Pesan</span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-[#1a1a1a] mb-2">
                Mulai Konsultasi Menu
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Isi form di bawah dan pesan Anda akan langsung diteruskan ke WhatsApp admin kami.
              </p>
              <ContactForm />
            </div>

            {/* Map Card */}
            <div className="flex flex-col gap-6">
              {/* Map embed */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex-1 min-h-[380px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.015009135995!2d106.62876837601522!3d-6.261752693726827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbf2ae71eae1%3A0xfb37c8932fb746c9!2sDapur%20Srasa%20Gading%20Serpong!5e0!3m2!1sen!2sid!4v1784705789504!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Lokasi Dapur Srasa Gading Serpong"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Quick action card */}
              <div className="bg-gradient-to-br from-[#005926] to-[#004a1f] rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="bg-white/15 p-3 rounded-xl shrink-0">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-base">Dapur Srasa Gading Serpong</p>
                    <p className="text-white/70 text-sm mt-0.5">Ruko Sorento Grande West B19</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/dapursrasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-white text-[#005926] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#f0f0f0] transition-colors"
                >
                  Buka di Maps →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ / REASSURANCE STRIP ── */}
      <section className="py-16 bg-[#F8F8F8] border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h3 className="font-heading text-2xl font-bold text-[#1a1a1a] mb-3">Mengapa Pesan Melalui Kami?</h3>
          <p className="text-gray-500 mb-10">Kami berkomitmen memberikan pengalaman pesan catering yang mudah dan menyenangkan.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { emoji: "⚡", title: "Respons Cepat", desc: "Tim kami merespons pesan WhatsApp dalam waktu &lt; 1 jam di hari kerja." },
              { emoji: "🍽️", title: "Konsultasi Menu Gratis", desc: "Kami bantu Anda memilih menu terbaik yang sesuai acara dan budget." },
              { emoji: "🚚", title: "Pengiriman Tepat Waktu", desc: "Catering Anda tiba sesuai jadwal yang disepakati, tanpa keterlambatan." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <span className="text-3xl mb-3 block">{emoji}</span>
                <h4 className="font-bold text-[#1a1a1a] mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
