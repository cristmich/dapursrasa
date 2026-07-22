export const metadata = {
  title: "Privacy Policy | Dapur Srasa",
  description: "Kebijakan Privasi (Privacy Policy) Dapur Srasa dalam melindungi data dan informasi pelanggan kami.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20 pt-32">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-heading mb-6">Kebijakan Privasi (Privacy Policy)</h1>
          <p className="text-gray-500 mb-8">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Pendahuluan</h2>
              <p>
                Selamat datang di Dapur Srasa. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda bagikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, membagikan, dan melindungi informasi pribadi Anda saat menggunakan layanan catering dan nasi box kami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Informasi yang Kami Kumpulkan</h2>
              <p>Kami dapat mengumpulkan informasi pribadi dari Anda ketika Anda melakukan pemesanan, menghubungi kami melalui WhatsApp, atau berinteraksi dengan situs web kami. Informasi ini meliputi:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nama lengkap</li>
                <li>Nomor telepon / WhatsApp</li>
                <li>Alamat pengiriman (terutama di area jangkauan kami seperti BSD, Gading Serpong, Alam Sutera, Tangerang, dan Jakarta)</li>
                <li>Detail pesanan dan riwayat transaksi</li>
                <li>Informasi pembayaran</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
              <p>Informasi yang kami kumpulkan digunakan untuk tujuan berikut:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Memproses, mengelola, dan mengirimkan pesanan catering/nasi box Anda.</li>
                <li>Berkomunikasi dengan Anda mengenai pesanan, konfirmasi pembayaran, dan jadwal pengiriman.</li>
                <li>Meningkatkan kualitas layanan, menu masakan, dan pengalaman pelanggan kami.</li>
                <li>Memberikan penawaran promo, diskon, atau informasi terbaru (Anda dapat berhenti berlangganan kapan saja).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Pembagian Informasi Pribadi</h2>
              <p>
                Dapur Srasa <strong>tidak akan pernah menjual, menyewakan, atau menukar</strong> informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran mereka. Kami hanya membagikan informasi Anda kepada pihak ketiga yang terpercaya yang membantu operasional kami, seperti kurir pengiriman pihak ketiga (jika tidak menggunakan armada internal kami), dengan syarat mereka setuju untuk merahasiakan informasi tersebut.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Keamanan Data</h2>
              <p>
                Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Transaksi data sensitif dilindungi dengan standar keamanan industri.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau ingin meminta penghapusan data Anda dari sistem kami, silakan hubungi kami melalui:
              </p>
              <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p><strong>Dapur Srasa</strong></p>
                <p>Ruko Sorento Grande West B19, Gading Serpong, Tangerang</p>
                <p>WhatsApp: +62 895-3285-96248</p>
                <p>Email: dapursrasa@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
