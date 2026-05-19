import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PlayersPage from "@/components/landing/PlayersPage";

export const metadata = {
  title: "First Team Squad | Island Football Club",
  description: "Meet the talented players who represent Island Football Club's first team.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <PlayersPage />
      </main>
      <Footer />
    </div>
  );
}
