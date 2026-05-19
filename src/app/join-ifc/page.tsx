import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import JoinIfcPage from "@/components/landing/JoinIfcPage";

export const metadata = {
  title: "Join Island FC | Island Football Club",
  description: "Create your membership account and join the Island Football Club community today.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <JoinIfcPage />
      </main>
      <Footer />
    </div>
  );
}
