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
  authors: [{ name: "Dapur Srasa" }],
  openGraph: {
    title: "Catering & Nasi Box Termurah No 1 di BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta",
    description: "Catering harian rumahan premium dan nasi box termurah no 1 untuk wilayah BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta dan sekitarnya.",
    url: "https://dapursrasa.com",
    siteName: "Dapur Srasa",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catering Termurah No 1 di Tangerang & Jakarta | Dapur Srasa",
    description: "Catering harian rumahan premium dan nasi box termurah no 1 untuk wilayah BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta dan sekitarnya.",
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
              "@type": "Restaurant",
              "name": "Dapur Srasa",
              "image": "https://dapursrasa.com/images/hero.jpg",
              "description": "Layanan catering harian dan nasi box termurah No 1 di BSD, Gading Serpong, Alam Sutera, Tangerang, Jakarta dan sekitarnya.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gading Serpong, BSD, Alam Sutera",
                "addressLocality": "Tangerang",
                "addressRegion": "Banten",
                "addressCountry": "ID"
              },
              "telephone": "+6281234567890",
              "servesCuisine": "Indonesian",
              "priceRange": "$"
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
