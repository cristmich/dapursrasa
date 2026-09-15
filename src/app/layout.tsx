import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConditionalNavbar } from "@/components/layout/ConditionalNavbar";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { ConditionalMain } from "@/components/layout/ConditionalMain";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dapursrasa.com"),
  title: {
    default: "Catering Termurah No 1 di BSD, Gading Serpong, Alam Sutera & Jakarta | Dapur Srasa",
    template: "%s | Dapur Srasa"
  },
  description: "Dapur Srasa adalah penyedia layanan catering harian dan nasi box termurah No 1 di BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta dan sekitarnya. Kualitas premium, harga paling terjangkau.",
  keywords: [
    "catering termurah no 1",
    "catering bsd termurah",
    "catering gading serpong termurah",
    "catering alam sutera termurah",
    "catering tangerang",
    "catering jakarta termurah",
    "nasi box termurah bsd",
    "nasi box gading serpong",
    "catering rumahan premium termurah",
    "pesan nasi box tangerang",
    "dapur srasa",
    "nasi kotak murah",
    "catering harian bsd",
    "catering rantangan",
    "pesan nasi tumpeng tangerang",
    "snack box murah",
    "catering prasmanan tangerang",
    "nasi kuning bento",
    "catering pabrik tangerang",
    "catering sehat bsd",
    "menu nasi box harga 20000",
    "rekomendasi catering jakarta",
    "catering event murah",
    "nasi box ayam bakar"
  ],
  authors: [{ name: "Dapur Srasa", url: "https://dapursrasa.com" }],
  creator: "Dapur Srasa",
  publisher: "Dapur Srasa",
  category: "Food & Restaurant",
  alternates: {
    canonical: "https://dapursrasa.com",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
            ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
            : {},
        },
      }
    : {}),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Catering & Nasi Box Termurah No 1 di BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta",
    description: "Catering harian rumahan premium dan nasi box termurah no 1 untuk wilayah BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta dan sekitarnya.",
    url: "https://dapursrasa.com",
    siteName: "Dapur Srasa",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://dapursrasa.com/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Dapur Srasa - Catering Termurah No 1 di Jabodetabek",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catering Termurah No 1 di Tangerang & Jakarta | Dapur Srasa",
    description: "Catering harian rumahan premium dan nasi box termurah no 1 untuk wilayah BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta dan sekitarnya.",
    images: ["https://dapursrasa.com/meta-image.png"],
    site: "@dapursrasa",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon/favicon.ico"],
    apple: [
      { url: "/favicon/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicon/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicon/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicon/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicon/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/favicon/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicon/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        {/* ── Supplementary Crawler Hints (Next.js handles robots/googlebot automatically) ── */}
        {/* Referrer policy */}
        <meta name="referrer" content="origin-when-cross-origin" />
        {/* Language & geo hints for local search */}
        <meta httpEquiv="content-language" content="id" />
        <meta name="geo.region" content="ID-BT" />
        <meta name="geo.placename" content="Tangerang, Banten, Indonesia" />
        <meta name="geo.position" content="-6.2383;106.6228" />
        <meta name="ICBM" content="-6.2383, 106.6228" />

        {/* ── Google Tag Manager / Analytics ───────────────────────── */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-S8PVBJR7ZN" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S8PVBJR7ZN');
            `,
          }}
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WJMC9NPW');
            `,
          }}
        />
        {/* ── SiteNavigationElement JSON-LD (helps AI understand site structure) ── */}
        <Script
          id="ld-sitenavigation"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteLinksSearchBox",
              "url": "https://dapursrasa.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://dapursrasa.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {/* ── BreadcrumbList JSON-LD (helps AI crawlers understand page hierarchy) ── */}
        <Script
          id="ld-breadcrumb"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://dapursrasa.com" },
                { "@type": "ListItem", "position": 2, "name": "Catering Mingguan", "item": "https://dapursrasa.com/catering-mingguan" },
                { "@type": "ListItem", "position": 3, "name": "Nasi Box", "item": "https://dapursrasa.com/nasi-box" },
                { "@type": "ListItem", "position": 4, "name": "Tentang Kami", "item": "https://dapursrasa.com/tentang-kami" },
                { "@type": "ListItem", "position": 5, "name": "Hubungi Kami", "item": "https://dapursrasa.com/hubungi-kami" },
              ]
            })
          }}
        />
        {/* ── FAQ JSON-LD (appears in rich snippets & AI answers) ── */}
        <Script
          id="ld-faq"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Berapa harga nasi box Dapur Srasa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Harga nasi box Dapur Srasa mulai dari Rp 30.000 per box, sudah termasuk nasi putih, lauk utama, 2 lauk pendamping, free sambal, dan free kerupuk."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Area mana saja yang dilayani Dapur Srasa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dapur Srasa melayani seluruh wilayah Jabodetabek, termasuk BSD City, Gading Serpong, Alam Sutera, Tangerang, Tangerang Selatan, Jakarta Selatan, Jakarta Pusat, Jakarta Barat, Jakarta Timur, Jakarta Utara, Depok, Bogor, dan Bekasi."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apakah catering Dapur Srasa halal?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ya, 100% Halal. Dapur Srasa menerapkan prinsip No Pork No Lard. Semua bahan dan proses memasak memenuhi standar halal."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Berapa minimum order nasi box Dapur Srasa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Minimum order nasi box adalah 10 box per pesanan."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apa itu Catering Mingguan Dapur Srasa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Catering Mingguan adalah layanan berlangganan makan harian Senin–Jumat. Menu berganti setiap hari dengan 17 pilihan varian lauk dari ayam, ikan, daging, dan udang. Harga mulai Rp 199.000 per pax."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Bagaimana cara memesan catering Dapur Srasa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pesan melalui WhatsApp ke nomor +6289532859624 atau klik tombol WhatsApp di website dapursrasa.com. Admin kami siap membantu 07.00–20.00 setiap hari."
                  }
                }
              ]
            })
          }}
        />
      </head>

      <body className="min-h-full flex flex-col font-sans text-[#333333] bg-[#FFFFFF]">
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WJMC9NPW"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Restaurant", "FoodEstablishment", "LocalBusiness"],
              "name": "Dapur Srasa",
              "alternateName": "Dapur Srasa Catering",
              "url": "https://dapursrasa.com",
              "logo": "https://dapursrasa.com/logo.png",
              "image": "https://dapursrasa.com/meta-image.png",
              "description": "Layanan catering harian dan nasi box termurah No 1 di BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta dan sekitarnya. Menu bervariasi, higienis, dan lezat.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gading Serpong",
                "addressLocality": "Tangerang",
                "addressRegion": "Banten",
                "postalCode": "15810",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -6.2383,
                "longitude": 106.6228
              },
              "telephone": "+6289532859624",
              "email": "dapursrasa@gmail.com",
              "servesCuisine": ["Indonesian", "Catering"],
              "priceRange": "Rp20.000 - Rp60.000",
              "currenciesAccepted": "IDR",
              "paymentAccepted": ["Transfer Bank", "QRIS", "Cash"],
              "areaServed": [
                "BSD City", "Gading Serpong", "Alam Sutera", "Tangerang",
                "Tangerang Selatan", "Jakarta Selatan", "Jakarta Pusat",
                "Jakarta Barat", "Jakarta Utara", "Jakarta Timur",
                "Depok", "Bogor", "Bekasi"
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "07:00",
                  "closes": "20:00"
                }
              ],
              "hasMap": "https://maps.google.com/?q=Dapur+Srasa+Gading+Serpong",
              "sameAs": [
                "https://www.instagram.com/dapursrasa/",
                "https://www.tiktok.com/@dapur.srasa"
              ],
              "menu": "https://dapursrasa.com/catering-mingguan",
              "potentialAction": {
                "@type": "OrderAction",
                "target": "https://wa.me/62895328596248"
              }
            })
          }}
        />
        <ConditionalNavbar />
        <ConditionalMain>
          {children}
        </ConditionalMain>
        <ConditionalFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
