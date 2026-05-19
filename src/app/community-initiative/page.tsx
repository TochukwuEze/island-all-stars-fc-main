import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CommunityInitiativePage from "@/components/landing/CommunityInitiativePage";

export const metadata = {
  title: "Community Initiatives | Island Football Club",
  description: "Island FC is committed to using the power of football to drive positive social change in our communities.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <CommunityInitiativePage />
      </main>
      <Footer />
    </div>
  );
}
