import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import JoinIascPage from "@/components/landing/JoinIascPage";

export const metadata = {
  title: "Join IASC | Island Allstars Sports Club",
  description: "Create your membership account and join the Island Allstars Sports Club community today.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <JoinIascPage />
      </main>
      <Footer />
    </div>
  );
}
