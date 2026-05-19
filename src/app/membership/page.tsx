import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import MembershipPage from "@/components/landing/MembershipPage";

export const metadata = {
  title: "Membership | Island Football Club",
  description: "Join Island Football Club and become a part of our exclusive community. Discover our membership tiers and benefits.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <MembershipPage />
      </main>
      <Footer />
    </div>
  );
}
