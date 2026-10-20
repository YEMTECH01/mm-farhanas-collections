"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

export default function Navbar() {
  const { toggleCart, items } = useCartStore();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-luxury-beige relative z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* 👑 ELITE MONOGRAM LOGO */}
        <Link
          href="/"
          className="group flex flex-col items-center justify-center z-50"
        >
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-luxury-gold/50 group-hover:w-12 transition-all duration-500"></div>
            <h1 className="font-serif text-3xl lg:text-4xl text-luxury-dark tracking-widest leading-none">
              MM
            </h1>
            <div className="h-[1px] w-8 bg-luxury-gold/50 group-hover:w-12 transition-all duration-500"></div>
          </div>
          <span className="text-[9px] lg:text-[10px] tracking-[0.4em] text-luxury-gold uppercase mt-1 ml-1 font-sans">
            Farhana's Collections
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.2em] transition-colors relative group ${
                  isActive
                    ? "text-luxury-dark"
                    : "text-luxury-dark/70 hover:text-luxury-dark"
                }`}
              >
                {link.name}
                {/* Gold underline on hover */}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-luxury-gold transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-6 z-50">
          <Link
            href="/collections"
            aria-label="Search"
            className="hidden sm:block text-luxury-dark/80 hover:text-luxury-gold transition-colors"
          >
            <Search size={18} strokeWidth={1.5} />
          </Link>
          <Link
            href="/admin/login"
            aria-label="Account"
            className="hidden sm:block text-luxury-dark/80 hover:text-luxury-gold transition-colors"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>
          <button
            onClick={toggleCart}
            aria-label="Cart"
            className="relative text-luxury-dark/80 hover:text-luxury-gold transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-luxury-gold text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </button>

          <button
            className="lg:hidden text-luxury-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-luxury-beige border-t border-luxury-gold/20 shadow-xl py-6 flex flex-col items-center gap-6 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-xs uppercase tracking-[0.2em] ${
                pathname === link.href
                  ? "text-luxury-gold font-bold"
                  : "text-luxury-dark"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-6 mt-2 pt-4 border-t border-luxury-gold/20 w-full justify-center">
            <Link
              href="/collections"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[10px] tracking-widest uppercase text-luxury-dark/70 hover:text-luxury-gold"
            >
              Search
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[10px] tracking-widest uppercase text-luxury-dark/70 hover:text-luxury-gold"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
