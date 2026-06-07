"use client";

import { TopBar } from "@/components/landing/TopBar";
import { MainHeader } from "@/components/landing/MainHeader";
import { Navbar } from "@/components/landing/Navbar";
import LoginPage from "@/components/auth/LoginPage";
import { useRouter } from "next/navigation";
import Footer from "@/components/landing/Footer";

export default function Page() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/member-portal");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000a14]">
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-1">
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </main>
      <Footer />
    </div>
  );
}
