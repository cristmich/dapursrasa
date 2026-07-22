export const metadata = {
  title: "Terms & Conditions | Dapur Srasa",
  description: "Syarat dan Ketentuan layanan pemesanan catering harian dan nasi box Dapur Srasa.",
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20 pt-32">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-heading mb-6">Syarat & Ketentuan (Terms & Conditions)</h1>
          <p className="text-gray-500 mb-8">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Ketentuan Umum</h2>
              <p>
                Dengan mengakses dan melakukan pemesanan di Dapur Srasa, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan yang berlaku. Dapur Srasa berhak untuk mengubah syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Pemesanan dan Pembayaran</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Pemesanan Nasi Box dan Catering Mingguan/Harian disarankan dilakukan paling lambat <strong>H-1 (Satu hari sebelum pengiriman)</strong> sebelum jam 15.00 WIB.</li>
                <li>Untuk pesanan dalam partai besar (lebih dari 100 pax), pemesanan harap dilakukan selambat-lambatnya <strong>H-3</strong>.</li>
                <li>Pemesanan dianggap sah atau diproses setelah pihak Dapur Srasa menerima <strong>Down Payment (DP) sebesar minimal 50%</strong> dari total pesanan, atau pelunasan penuh.</li>
                <li>Sisa pembayaran wajib dilunasi paling lambat pada hari H pengiriman sebelum pesanan diturunkan/diterima oleh pelanggan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Pembatalan dan Perubahan Pesanan</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Perubahan jumlah pesanan (penambahan/pengurangan) atau perubahan menu hanya dapat dilayani selambat-lambatnya <strong>H-1 sebelum pukul 12.00 WIB</strong>.</li>
                <li>Pembatalan pesanan pada H-1 akan mengakibatkan <strong>uang muka (DP) hangus</strong> atau tidak dapat dikembalikan, sebagai kompensasi bahan baku yang sudah dipersiapkan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Pengiriman (Delivery)</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Dapur Srasa memberikan layanan <strong>Gratis Ongkos Kirim (Free Ongkir)</strong> untuk area Jabodetabek dengan syarat dan ketentuan minimum order yang berlaku (silakan hubungi admin untuk detail minimum order per area).</li>
                <li>Pengiriman dilakukan oleh armada internal kami atau mitra kurir pihak ketiga yang terpercaya.</li>
                <li>Waktu ketibaan pesanan mungkin memiliki toleransi keterlambatan +/- 30 menit akibat kondisi lalu lintas atau cuaca yang tidak terduga.</li>
                <li>Tanggung jawab kondisi makanan beralih kepada pelanggan setelah makanan diterima di lokasi tujuan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Kualitas dan Keluhan Makanan</h2>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Dapur Srasa menjamin 100% makanan diolah secara higienis, halal, dan menggunakan bahan baku segar.</li>
                <li>Demi menjaga kualitas, makanan disarankan untuk dikonsumsi paling lambat <strong>4 jam</strong> setelah pesanan diterima. Dapur Srasa tidak bertanggung jawab atas kerusakan makanan yang disimpan melebihi batas waktu tersebut atau disimpan dengan cara yang tidak tepat.</li>
                <li>Apabila terdapat keluhan (kekurangan jumlah pesanan atau masalah kualitas pada saat diterima), harap segera melaporkan ke admin kami maksimal <strong>2 jam</strong> setelah pesanan diterima, disertai bukti foto/video.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Keadaan Memaksa (Force Majeure)</h2>
              <p>
                Dapur Srasa dibebaskan dari tanggung jawab atas keterlambatan atau kegagalan pengiriman yang disebabkan oleh hal-hal di luar kendali kami, termasuk namun tidak terbatas pada bencana alam, banjir, huru-hara, pemogokan massal, atau kebijakan pemerintah yang membatasi pergerakan lalu lintas.
              </p>
            </section>

            <section className="mt-8 border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-500 italic">
                Jika Anda membutuhkan bantuan atau klarifikasi lebih lanjut mengenai Syarat dan Ketentuan ini, silakan hubungi tim Customer Service kami melalui WhatsApp.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
