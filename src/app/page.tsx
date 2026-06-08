import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import Footer from "@/components/landing/Footer";
import OurExpertsLead from "@/components/landing/OurExpertsLead";
import News from "@/components/landing/News";
import StatsAndAnalytics from "@/components/landing/StatsAndAnalytics";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <OurExpertsLead />
        <News />
        <StatsAndAnalytics />
      </main>
      <Footer />
    </div>
  );
}
