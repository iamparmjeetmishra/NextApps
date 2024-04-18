import { HeroSection, FeaturedSection, WhyChooseUs, TestimonialCards, UpcomingWebinars } from "@/components";

export default function Home() {
  return (
    <main className="main-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <FeaturedSection />
      <WhyChooseUs />
      <TestimonialCards />
      <UpcomingWebinars />
    </main>
  );
}
