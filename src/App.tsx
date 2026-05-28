import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { WorkSection } from "@/components/WorkSection";
import { WhySection } from "@/components/WhySection";
import { TechStackSection } from "@/components/TechStackSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTAFooter } from "@/components/CTAFooter";

function App() {
  return (
    <div className="bg-hero-bg min-h-screen font-sora">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <WhySection />
      <TechStackSection />
      <TestimonialsSection />
      <CTAFooter />
    </div>
  );
}

export default App;
