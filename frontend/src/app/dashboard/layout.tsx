"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getToken } from "@/lib/auth-token";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    setCheckedAuth(true);
  }, [router]);

  if (!checkedAuth) return null;

  return (
    <div className="flex min-h-screen">

      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 lg:ml-[240px]">

          <header className="h-16 flex items-center px-4 lg:hidden">

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="text-primary"
          >
            <Menu />
          </button>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}