import { MainHeader } from "@/components/landing/MainHeader";
import AdminPortal from "@/components/admin/AdminPortal";

export const metadata = {
  title: "Admin Portal | Island Football Club",
  description: "Manage IFC members, matches, and activities.",
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
        <AdminPortal />
      </main>
    </div>
  );
}
