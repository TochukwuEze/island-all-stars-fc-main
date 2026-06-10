import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ActivitiesPage from "@/components/landing/ActivitiesPage";

export const metadata = {
  title: "Sports & Training | Island Allstars Sports Club",
  description: "Promoting physical fitness, wellness, and camaraderie through consistent training and recreational activities for our members.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <ActivitiesPage />
      </main>
      <Footer />
    </div>
  );
}
