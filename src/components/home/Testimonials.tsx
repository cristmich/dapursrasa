"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Each conversation: array of messages
// role: "customer" | "admin"
const conversations = [
  {
    id: 1,
    customer: "Sarah Amelia",
    avatar: "SA",
    avatarBg: "bg-pink-400",
    service: "Catering Mingguan",
    rating: 5,
    messages: [
      { role: "customer", text: "Halo kak, mau tanya untuk catering mingguan ada ga ya? 😊", time: "09:10" },
      { role: "admin", text: "Halo Kak Sarah! Ada dong 😊 Kami sediain catering mingguan mulai Senin–Jumat. Menu ganti tiap minggu, fresh setiap hari. Untuk berapa orang ya Kak?", time: "09:12" },
      { role: "customer", text: "Untuk 2 orang aja, di rumah. Harganya berapa kak?", time: "09:13" },
      { role: "admin", text: "Untuk 2 porsi bisa mulai dari Rp 35.000/porsi/hari ya Kak ✅ FREE ongkir area Gading Serpong & BSD. Mau coba dulu 1 minggu?", time: "09:14" },
      { role: "customer", text: "Wah oke banget! Langsung daftar ya kak 🥰", time: "09:15" },
      { role: "customer", text: "Udah 3 bulan langganan, makanannya enak banget! Nggak pernah bosen karena menunya ganti terus. Highly recommended!! ⭐⭐⭐⭐⭐", time: "3 bln lalu" },
    ],
  },
  {
    id: 2,
    customer: "Budi Santoso",
    avatar: "BS",
    avatarBg: "bg-blue-500",
    service: "Nasi Box - Corporate 150 pax",
    rating: 5,
    messages: [
      { role: "customer", text: "Permisi, saya mau order nasi box untuk acara kantor 150 pax minggu depan. Bisa ga?", time: "14:00" },
      { role: "admin", text: "Halo Pak Budi! Bisa banget 💪 Untuk 150 pax kami sanggup. Acaranya tanggal berapa dan jam berapa pengirimannya Pak?", time: "14:02" },
      { role: "customer", text: "Jumat depan, jam 11 siang. Menu ayam & ikan bisa?", time: "14:03" },
      { role: "admin", text: "Bisa Pak! Kami siapkan menu Ayam Bakar + Ikan Bumbu Rujak, lengkap dengan nasi, sayur, sambal, & kerupuk 🍱 Kemasan premium ya Pak. Mau saya kirim proposal harganya?", time: "14:05" },
      { role: "customer", text: "Mantap! Semua kolega puji banget makanannya, pengiriman juga tepat waktu jam 11 persis. RECOMMENDED! 👍⭐⭐⭐⭐⭐", time: "Jum, 11:32" },
    ],
  },
  {
    id: 3,
    customer: "Ayu Rahmawati",
    avatar: "AR",
    avatarBg: "bg-purple-500",
    service: "Nasi Box - Arisan 50 pax",
    rating: 5,
    messages: [
      { role: "customer", text: "Kak, saya mau pesan nasi box untuk arisan 50 orang. Budget Rp 45.000/pax, bisa ga?", time: "10:00" },
      { role: "admin", text: "Halo Kak Ayu! Bisa ya 😊 Dengan budget itu kami bisa siapkan menu Ayam Kecap + Tempe Orek + Sayur Asem. Cantik kemasannya, cocok untuk arisan! 🎀", time: "10:03" },
      { role: "customer", text: "Wah cocok banget! Boleh request tambahin buah potong ga kak?", time: "10:05" },
      { role: "admin", text: "Boleh banget Kak, kami tambahkan pepaya/semangka ya 🍉 Nanti kami konfirmasi H-1 sebelum pengiriman!", time: "10:06" },
      { role: "customer", text: "Acara arisan sukses!! Banyak yang nanya nasi boxnya dari mana 😄 Pasti repeat order! ⭐⭐⭐⭐⭐", time: "Sab, 14:20" },
    ],
  },
  {
    id: 4,
    customer: "Rina Kusuma",
    avatar: "RK",
    avatarBg: "bg-teal-500",
    service: "Catering Mingguan - 6 Bulan",
    rating: 5,
    messages: [
      { role: "customer", text: "Kak boleh request menu yang ga pedes? Anak saya ga suka pedas 🙏", time: "08:00" },
      { role: "admin", text: "Tentu bisa Kak Rina! Kami catat preferensi keluarga kakak ya. Sambal bisa kami pisah atau ga pakai sama sekali 😊 Menu tetap lengkap dan lezat!", time: "08:05" },
      { role: "customer", text: "Makasih kak, beneran helpful banget. Anak-anak jadi doyan makan!", time: "08:07" },
      { role: "admin", text: "Senang mendengarnya Kak 🥰 Kalau ada feedback menu lainnya, langsung chat kami ya!", time: "08:08" },
      { role: "customer", text: "6 bulan langganan, masih tetap enak & konsisten! Anak-anak suka, suami puas. Thank you Dapur Srasa!! ❤️⭐⭐⭐⭐⭐", time: "6 bln lalu" },
    ],
  },
  {
    id: 5,
    customer: "Dino Pratama",
    avatar: "DP",
    avatarBg: "bg-orange-500",
    service: "Nasi Box - Wedding 200 pax",
    rating: 5,
    messages: [
      { role: "customer", text: "Halo, saya mau pesan untuk resepsi pernikahan adik 200 pax. Apakah bisa?", time: "19:00" },
      { role: "admin", text: "Halo Kak Dino! Selamat ya untuk pernikahan adiknya 🎊 Bisa kami handle 200 pax. Boleh share tanggal & lokasinya Kak?", time: "19:03" },
      { role: "customer", text: "Sabtu depan, di Serpong. Menu spesial wedding bisa kak?", time: "19:05" },
      { role: "admin", text: "Bisa! Kami rekomendasikan paket Nasi Box Wedding: Ayam Panggang Madu + Udang + Sayur + Dessert 🍱✨ Kemasan eksklusif dengan label nama acara. Menarik kan?", time: "19:07" },
      { role: "customer", text: "Semua tamu compliment soal makanannya! On time pengirimannya. 5 BINTANG layaknya restoran bintang 5! 🌟⭐⭐⭐⭐⭐", time: "Sab, 13:45" },
    ],
  },
  {
    id: 6,
    customer: "Fajar Nugroho",
    avatar: "FN",
    avatarBg: "bg-cyan-600",
    service: "Catering - Diet Khusus",
    rating: 5,
    messages: [
      { role: "customer", text: "Kak, papa saya sakit jantung, perlu menu rendah garam & rendah lemak. Apakah bisa?", time: "16:00" },
      { role: "admin", text: "Halo Kak Fajar, kami turut doakan papanya cepat pulih ya 🙏 Bisa kami buatkan menu khusus rendah garam. Kami akan koordinasi dengan tim dapur untuk memastikan setiap menu aman.", time: "16:05" },
      { role: "customer", text: "Alhamdulillah, makasih kak. Ini sangat berarti banget buat kami 🙏", time: "16:07" },
      { role: "admin", text: "Dengan senang hati Kak! Kesehatan keluarga kakak adalah prioritas kami juga 😊 Nanti kami kirim daftar menu khusus untuk papa ya.", time: "16:08" },
      { role: "customer", text: "Request menu khusus diet bisa diakomodir & rasanya tetap enak! Ini yang bikin Dapur Srasa beda. Sangat appreciate! ⭐⭐⭐⭐⭐", time: "1 bln lalu" },
    ],
  },
  {
    id: 7,
    customer: "Dewi Anggraeni",
    avatar: "DA",
    avatarBg: "bg-green-500",
    service: "Catering Mingguan - Gading Serpong",
    rating: 5,
    messages: [
      { role: "customer", text: "Kak, FREE ongkir beneran ga? Saya di Serpong 😂", time: "13:00" },
      { role: "admin", text: "Haha beneran Kak Dewi 😄 Gading Serpong, BSD, dan sekitarnya GRATIS ongkir semua. Kapan mau mulai langganan?", time: "13:02" },
      { role: "customer", text: "Wah serius?? Langsung mau dong! Bisa mulai Senin?", time: "13:03" },
      { role: "admin", text: "Bisa banget! Kami konfirmasi order ya Kak. Nanti pagi-pagi sudah sampai depan rumah 🚗💨", time: "13:04" },
      { role: "customer", text: "Udah rekomendasiin ke 5 teman, mereka langsung langganan juga! FREE ongkir adalah bonus terbaik 🥳⭐⭐⭐⭐⭐", time: "2 bln lalu" },
    ],
  },
];

function WhatsAppChat({ conv }: { conv: typeof conversations[0] }) {
  return (
    <div className="relative mx-auto w-[290px] sm:w-[310px] shrink-0">
      {/* Phone shell */}
      <div className="bg-[#111] rounded-[3.2rem] p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
        <div className="bg-[#ECE5DD] rounded-[2.6rem] overflow-hidden relative">

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111] rounded-b-2xl z-20" />

          {/* Status bar */}
          <div className="bg-[#075E54] pt-6 pb-0">
            <div className="px-4 pb-2 flex items-center gap-2.5">
              {/* Back arrow */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white opacity-80"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>

              <div className={`${conv.avatarBg} w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-semibold leading-tight">{conv.customer}</p>
                <p className="text-white/60 text-[9px]">online</p>
              </div>
              <div className="flex gap-2.5 opacity-80">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
            </div>
          </div>

          {/* Chat body */}
          <div
            className="px-2.5 py-2 flex flex-col gap-1.5 overflow-y-auto"
            style={{ minHeight: 310, maxHeight: 310, background: "#ECE5DD" }}
          >
            {/* Day label */}
            <div className="flex justify-center my-1">
              <span className="bg-[#E1F2FB]/80 text-[#547985] text-[9px] px-2.5 py-0.5 rounded-full shadow-sm font-medium">HARI INI</span>
            </div>

            {conv.messages.map((msg, i) => {
              const isAdmin = msg.role === "admin";
              return (
                <div key={i} className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`relative max-w-[200px] px-2.5 py-1.5 shadow-sm ${
                      isAdmin
                        ? "bg-white rounded-2xl rounded-tl-sm"
                        : "bg-[#DCF8C6] rounded-2xl rounded-tr-sm"
                    }`}
                  >
                    {isAdmin && (
                      <p className="text-[#075E54] text-[9px] font-bold mb-0.5">Dapur Srasa 🍽️</p>
                    )}
                    <p className="text-[10.5px] text-gray-800 leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-0.5 ${isAdmin ? "justify-start" : "justify-end"}`}>
                      <span className="text-[8px] text-gray-400">{msg.time}</span>
                      {!isAdmin && (
                        <svg viewBox="0 0 16 11" className="w-3 h-2.5 fill-[#53BDEB]">
                          <path d="M11.071.653a.56.56 0 0 0-.812 0L5.605 5.341 3.741 3.486a.56.56 0 0 0-.812 0L.5 5.921a.56.56 0 0 0 0 .812l4.7 4.614a.56.56 0 0 0 .812 0L11.07 6.8l4.429-4.336a.56.56 0 0 0 0-.812L11.07.653z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rating badge */}
          <div className="bg-white/90 border-t border-gray-200 px-3 py-2 flex items-center justify-between">
            <span className="text-[9px] text-[#075E54] font-semibold">📦 {conv.service}</span>
            <div className="flex gap-0.5">
              {[...Array(conv.rating)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
          </div>

          {/* Input bar */}
          <div className="bg-[#F0F0F0] px-2 py-1.5 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-500 shrink-0"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>
            <div className="flex-1 bg-white rounded-full h-7 flex items-center px-3">
              <span className="text-[9px] text-gray-400">Pesan</span>
            </div>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-500 shrink-0"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            <div className="bg-[#25D366] w-7 h-7 rounded-full flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export function Testimonials() {

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F8F8] to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-5"
        >
          <span className="inline-flex items-center gap-2 text-[#25D366] text-sm font-bold tracking-widest uppercase mb-3">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Testimoni via WhatsApp
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1a1a] mb-4 leading-tight">
            Apa Kata <span className="text-[#005926]">Mereka?</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Chat nyata antara pelanggan & admin Dapur Srasa — bukti nyata kepercayaan ribuan keluarga dan perusahaan.
          </p>
        </motion.div>

        {/* Stars summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
          <span className="font-extrabold text-2xl text-[#1a1a1a]">5.0</span>
          <span className="text-gray-400 text-sm">dari 200+ ulasan nyata</span>
        </motion.div>

        {/* Infinite Horizontal Marquee */}
        <div className="relative">
          {/* Gradient edges for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F8F8F8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden flex w-full">
            <div className="flex gap-8 pb-10 pt-2 animate-marquee w-max px-4 hover:animate-pause">
              {/* Duplicate array for seamless infinite scrolling */}
              {[...conversations, ...conversations].map((conv, index) => (
                <div key={index} className="shrink-0">
                  <WhatsAppChat conv={conv} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
