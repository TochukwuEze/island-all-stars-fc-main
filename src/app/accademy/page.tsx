import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AcademyPage from "@/components/landing/AcademyPage";

export const metadata = {
  title: "Youth Academy | Island Football Club",
  description: "Developing the next generation of football stars through elite coaching and holistic player development.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <AcademyPage />
      </main>
      <Footer />
    </div>
  );
}
