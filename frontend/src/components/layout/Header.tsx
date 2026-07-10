"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import {
    Menu,
    X,
    ShoppingCart,
    User,
    ChevronDown,
} from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import { useCartStore } from "@/stores/Cart.store";
import { clearToken, getTokenPayload, TokenPayload } from "@/lib/auth-token";

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
        label: "Productos",
        children: [
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
        ],
    },
    {
        label: "Doy packs",
        href: "/doy_packs",
    },
];

const navLinkStyles =
    "relative font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-[var(--color-primary)] after:transition-transform hover:after:scale-x-100";

export default function Header() {
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const userBtnRef = useRef<HTMLButtonElement | null>(null);

    const [cartOpen, setCartOpen] = useState(false);

    const [user, setUser] = useState<TokenPayload | null>(null);

    useEffect(() => {
        setUser(getTokenPayload());
    }, []);

    const totalItems = useCartStore((state) => state.getTotalItems());

    const getFirstName = (fullName: string) => {
        return fullName.split(" ")[0];
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const logout = () => {
        clearToken();
        setUser(null);
        setDropdownOpen(false);
        router.push("/");
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
                            <li key={item.label} className="relative group">
                                {item.children ? (
                                    <>
                                        <button className="flex items-center gap-1 font-semibold text-primary hover:text-secondary transition-colors">
                                            {item.label}
                                            <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                                        </button>

                                        <div className="absolute top-8 left-0 min-w-[220px] bg-white rounded-lg shadow-xl py-3    opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible    group-hover:translate-y-0 transition-all duration-200">
                                            {item.children.map(
                                                (child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block px-4 py-2 text-sm hover:bg-primary/20 transition-colors">
                                                        {child.label}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className={navLinkStyles}
                                    >
                                        {item.label}
                                    </Link>
                                )}
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
                        {!user ? (
                            <Link
                                href="/ingresar"
                                className="hidden md:block font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                            >
                                Iniciar sesión
                            </Link>
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
                <div className="md:hidden absolute top-24 left-0 w-full min-h-screen bg-secondary shadow-lg z-40 items-center">
                    <ul className="flex flex-col py-10">
                        {navItems.map((item) => (
                            <li
                                key={item.label}
                            >
                                {item.children ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                setMobileProductsOpen(
                                                    (prev) => !prev
                                                )
                                            }
                                            className="w-82 flex items-center justify-between gap-20 px-6 py-4 font-semibold text-primary border-b mx-6">
                                            {item.label}

                                            <ChevronDown size={18} className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {/* SUBMENU */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? "max-h-96" : "max-h-0"}`}
                                        >
                                            <div className="flex flex-col pb-4">

                                                {item.children.map(
                                                    (child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            onClick={() =>
                                                                setMobileOpen(
                                                                    false
                                                                )
                                                            }
                                                            className="px-15 py-3 text-sm text-primary hover:bg-black/5">
                                                            {child.label}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        onClick={() =>
                                            setMobileOpen(false)
                                        }
                                        className="block px-6 py-4 font-semibold text-primary border-b mx-6">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}