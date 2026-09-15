import { allAreaSlugs } from "@/app/sitemap";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allAreaSlugs.map((area) => ({ area }));
}

import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HighlightServices } from "@/components/home/HighlightServices";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { HowToOrder } from "@/components/home/HowToOrder";
import { Testimonials } from "@/components/home/Testimonials";
import { AreaCoverage } from "@/components/home/AreaCoverage";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { RedirectIfAdmin } from "@/components/auth/RedirectIfAdmin";

function formatArea(area: string) {
  if (!area) return "Jabodetabek";
  return area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type Props = {
  params: Promise<{ area: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const areaName = formatArea(area);
  const url = `https://dapursrasa.com/${area}`;
  return {
    title: `Catering & Nasi Box Termurah di ${areaName} | Dapur Srasa`,
    description: `Jasa catering dan nasi box termurah di ${areaName}. Menu rumahan premium, halal, mulai Rp30.000. Catering mingguan & nasi box untuk acara. Gratis Ongkir minimal 10 box.`,
    keywords: [
      `catering ${areaName.toLowerCase()}`,
      `nasi box ${areaName.toLowerCase()}`,
      `catering murah ${areaName.toLowerCase()}`,
      `katering ${areaName.toLowerCase()}`,
      `jasa catering ${areaName.toLowerCase()}`,
      `pesan nasi box ${areaName.toLowerCase()}`,
      `catering harian ${areaName.toLowerCase()}`,
      "catering halal jabodetabek",
      "dapur srasa",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Catering & Nasi Box Termurah di ${areaName} | Dapur Srasa`,
      description: `Jasa catering dan nasi box termurah di ${areaName}. Mulai Rp30.000, halal, gratis ongkir.`,
      url,
      images: [
        {
          url: "https://dapursrasa.com/meta-image.png",
          width: 1200,
          height: 630,
          alt: `Catering & Nasi Box di ${areaName} - Dapur Srasa`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Catering & Nasi Box Termurah di ${areaName} | Dapur Srasa`,
      description: `Catering & nasi box murah di ${areaName}. Mulai Rp30.000, halal, gratis ongkir.`,
      images: ["https://dapursrasa.com/meta-image.png"],
    },
  };
}

export default async function HomeAreaPage({ params }: Props) {
  const { area } = await params;
  const areaName = formatArea(area);

  return (
    <>
      <RedirectIfAdmin />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            name: `Dapur Srasa ${areaName}`,
            image: "https://dapursrasa.com/meta-image.png",
            url: `https://dapursrasa.com/${area}`,
            telephone: "+6289532859624",
            priceRange: "Rp30.000 - Rp199.000",
            address: {
              "@type": "PostalAddress",
              addressLocality: areaName,
              addressRegion: "Banten",
              addressCountry: "ID",
            },
            areaServed: {
              "@type": "City",
              name: areaName,
            },
          }),
        }}
      />

      <Hero areaName={areaName} />
      <HighlightServices />
      <WhyChooseUs />
      <ProductShowcase />
      <HowToOrder />
      <Testimonials />
      <AreaCoverage />
      <FAQ />
      <CTA />
    </>
  );
}
