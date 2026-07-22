import { Hero } from "@/components/home/Hero";
import { HighlightServices } from "@/components/home/HighlightServices";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { HowToOrder } from "@/components/home/HowToOrder";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { RedirectIfAdmin } from "@/components/auth/RedirectIfAdmin";

export default function Home() {
  return (
    <>
      <RedirectIfAdmin />
      <Hero />
      <HighlightServices />
      <WhyChooseUs />
      <ProductShowcase />
      <HowToOrder />
      <Testimonials />
      <CTA />
    </>
  );
}
