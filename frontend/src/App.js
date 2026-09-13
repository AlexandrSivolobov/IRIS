import "@/App.css";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TeamSection from "@/components/sections/TeamSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import RegionsSection from "@/components/sections/RegionsSection";
import FooterSection from "@/components/sections/FooterSection";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <ServicesSection />
      <PortfolioSection />
      <TeamSection />
      <PartnershipSection />
      <RegionsSection />
      <FooterSection />
    </div>
  );
}

export default App;
