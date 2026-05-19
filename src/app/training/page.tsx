import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import TrainingPage from "@/components/landing/TrainingPage";

export const metadata = {
  title: "Training & Programs | Island Football Club",
  description: "Explore our training programs and weekly schedules at Island Football Club. From Youth Academy to Senior Squad.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <TrainingPage />
      </main>
      <Footer />
    </div>
  );
}
