import Faqs from "@/components/faqs/Faqs";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Newsletter from "@/components/newsletter/Newsletter";
import Stats from "@/components/stats/Stats";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Faqs />
    </>
  );
}
