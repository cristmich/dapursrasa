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
  if (!area) return 'Jabodetabek';
  return area.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

type Props = {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const areaName = formatArea(area);
  return {
    title: `Catering & Nasi Box Murah di ${areaName} | Dapur Srasa`,
    description: `Pesan Nasi Box dan Catering Mingguan termurah di ${areaName}. Harga mulai Rp35.000, 100% halal, masakan rumahan premium, dan Gratis Ongkir.`,
  };
}

export default async function HomeAreaPage({ params }: Props) {
  const { area } = await params;
  const areaName = formatArea(area);

  return (
    <>
      <RedirectIfAdmin />
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
