import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MatchesPage from "@/components/landing/MatchesPage";

export const metadata = {
  title: "Matches & Fixtures | Island Football Club",
  description: "View upcoming fixtures, recent results, and current league standings for Island FC.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <MatchesPage />
      </main>
      <Footer />
    </div>
  );
}
