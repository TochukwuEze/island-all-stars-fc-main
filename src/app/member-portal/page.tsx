import { MainHeader } from "@/components/landing/MainHeader";
import MemberPortalPage from "@/components/landing/MemberPortalPage";

export const metadata = {
  title: "Member Portal | Island Football Club",
  description: "Access your IFC member dashboard — view stats, upcoming matches, membership details, and messages.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
        <MemberPortalPage />
      </main>
    </div>
  );
}
