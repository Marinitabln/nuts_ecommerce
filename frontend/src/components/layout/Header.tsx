"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import {
    Menu,
    X,
    ShoppingCart,
    User,
} from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { useCartStore } from "@/stores/Cart.store";

const navItems = [
    {
        label: "Ofertas",
        href: "/ofertas",
    },
    {
        label: "Combos",
        href: "/combos",
    },
    {
        label: "Cereales",
        href: "/categoria/cereales",
    },
    {
        label: "Frutos secos",
        href: "/categoria/frutos-secos",
    },
    {
        label: "Semillas",
        href: "/categoria/semillas",
    },
    {
        label: "Envasados",
        href: "/categoria/envasados",
    },
    {
        label: "Doy packs",
        href: "/doy_packs",
    },
];

const navLinkStyles =
    "relative font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-[var(--color-primary)] after:transition-transform hover:after:scale-x-100";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const userBtnRef = useRef<HTMLButtonElement | null>(null);

    const [cartOpen, setCartOpen] = useState(false);

    // MOCK USER
    const user = {
        name: "Marina Blanco",
        role: "admin",
    };

    const isAuthenticated = true;

    const totalItems = useCartStore((state) => state.getTotalItems());

    const getFirstName = (fullName: string) => {
        return fullName.split(" ")[0];
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const logout = () => {
        console.log("logout");
    };

    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            const target = event.target as Node;

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(target) &&
                userBtnRef.current &&
                !userBtnRef.current.contains(target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <header className="w-full h-24 bg-[var(--color-background)] shadow-[1px_3px_5px_rgba(0,0,0,0.09)] sticky top-0 z-50">

            <div className="w-[90%] max-w-[1200px] mx-auto h-full">

                <nav className="h-full flex items-center justify-between">

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="z-50"
                    >
                        <img
                            src="/nuts_logo.svg"
                            alt="Nuts"
                            className="h-[85px] w-auto"
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <ul className="hidden md:flex items-center gap-6">

                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={navLinkStyles}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-4">

                        {/* CART */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className=" relative text-primary hover:text-secondary transition-colors">
                            <ShoppingCart className="w-6 h-6" />

                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-white text-[10px] font-bold transition-transform hover:scale-110">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* USER */}
                        {!isAuthenticated ? (
                            <button className="hidden md:block font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                                Iniciar sesión
                            </button>
                        ) : (
                            <div className="relative">

                                <button
                                    ref={userBtnRef}
                                    onClick={toggleDropdown}
                                    className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                                >
                                    <User />
                                </button>

                                {dropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute right-0 top-12 w-44 bg-white rounded-lg shadow-xl p-4 z-50 border"
                                    >

                                        <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                                            {user.role === "admin"
                                                ? "Administrador"
                                                : "Cliente"}
                                        </span>

                                        <p className="font-semibold mb-3">
                                            {getFirstName(user.name)}
                                        </p>

                                        {user.role === "admin" && (
                                            <Link
                                                href="/dashboard"
                                                className="block mb-3 font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                            >
                                                Dashboard
                                            </Link>
                                        )}

                                        <hr className="mb-3" />

                                        <button
                                            onClick={logout}
                                            className="w-full text-right hover:text-[var(--color-secondary)] transition-colors"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* MOBILE MENU BUTTON */}
                        <button
                            className="md:hidden text-[var(--color-primary)]"
                            onClick={() =>
                                setMobileOpen((prev) => !prev)
                            }
                        >
                            {mobileOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </nav>
            </div>

            <CartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
            />

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className="md:hidden absolute top-24 left-0 w-full bg-[var(--color-secondary)] shadow-lg z-40">

                    <ul className="flex flex-col items-center gap-6 py-10">

                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="font-semibold text-[var(--color-primary)]"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}