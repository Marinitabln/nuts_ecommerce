"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
  LogOut,
  Store,
  X
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth-token";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Productos",
    href: "/dashboard/productos",
    icon: Package,
  },
  {
    label: "Pedidos",
    href: "/dashboard/pedidos",
    icon: ShoppingCart,
  },
  {
    label: "Usuarios",
    href: "/dashboard/usuarios",
    icon: Users,
  },
  {
    label: "Categorías",
    href: "/dashboard/categorias",
    icon: Tags,
  },
  {
    label: "Configuración",
    href: "/dashboard/configuracion",
    icon: Settings,
  },
];

export default function DashboardSidebar({
  isOpen,
  onClose,
}: DashboardSidebarProps) {

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-primary/50 z-40 lg:hidden
          transition-opacity duration-300
          ${isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }
        `}
      />
      <aside
        className={`
          fixed top-0 left-0 min-h-screen w-[220px]
          bg-white z-50
          transition-transform duration-300
          flex flex-col
          shadow-lg
          justify-between
          
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        <div>
          {/* HEADER */}
          <div className="h-20 border-b px-6 pt-4 flex items-start justify-between">

            <Link
              href="/dashboard"
              className="flex items-center gap-3"
            >
              <Image
                src="/nuts_logo.svg"
                alt="Nuts"
                height={56}
                width={56}
              />

              <div>
                <p className="font-bold text-lg leading-none">
                  NUTS
                </p>

                <span className="text-xs text-gray-500">
                  Admin Panel
                </span>
              </div>
            </Link>

            <button onClick={onClose} className="lg:hidden text-primary">
              <X />
            </button>
          </div>

          {/* NAV */}
          <nav className="p-4 flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium   
                  ${isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:bg-secondary"
                    }
                `}
                >
                  <Icon size={20} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t flex flex-col gap-2">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-secondary transition-colors font-medium"
          >
            <Store size={20} />
            <span>Volver al sitio</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary hover:bg-secondary transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>
        </div>


      </aside>
    </>
  );
}