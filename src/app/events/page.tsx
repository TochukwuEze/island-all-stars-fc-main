import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import EventsPage from "@/components/landing/EventsPage";

export const metadata = {
  title: "Events | Island Football Club",
  description: "Discover upcoming club events, community programs, galas, and open tryouts at Island Football Club.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <EventsPage />
      </main>
      <Footer />
    </div>
  );
}
