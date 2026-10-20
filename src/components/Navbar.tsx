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
    <header className="w-full bg-luxury-beige relative z-50 border-b border-luxury-gold/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* 🏷️ THE UNIQUE LOGO DESIGN */}
        <Link href="/" className="group flex items-center z-50">
          <div className="flex items-stretch">
            {/* "MM" part - Dark Background */}
            <div className="bg-luxury-dark text-luxury-gold px-3 py-2 font-serif text-xl lg:text-2xl tracking-widest font-bold">
              MM
            </div>

            {/* "FARHANA'S" part - Gold Background with unique cut-out shape */}
            <div className="bg-luxury-gold text-white px-3 py-2 font-serif text-xl lg:text-2xl tracking-wide font-bold relative -ml-1 group-hover:bg-black transition-colors duration-300">
              FARHANA'S
            </div>

            {/* "COLLECTIONS" part - Outline style */}
            <div className="border border-luxury-dark text-luxury-dark px-3 py-2 text-xs lg:text-sm tracking-[0.2em] font-sans flex items-center -ml-1 group-hover:border-luxury-gold group-hover:text-luxury-gold transition-colors duration-300 hidden sm:flex">
              COLLECTIONS
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-luxury-dark font-bold border-b-2 border-luxury-gold pb-1"
                    : "text-luxury-dark/80 hover:text-luxury-gold"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-6 z-50">
          <Link
            href="/collections"
            aria-label="Search"
            className="hidden sm:block hover:text-luxury-gold transition-colors"
          >
            <Search size={20} strokeWidth={1.5} />
          </Link>
          <Link
            href="/admin/login"
            aria-label="Account"
            className="hidden sm:block hover:text-luxury-gold transition-colors"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>
          <button
            onClick={toggleCart}
            aria-label="Cart"
            className="relative hover:text-luxury-gold transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-luxury-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </button>

          <button
            className="lg:hidden text-luxury-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-luxury-beige border-t border-luxury-gold/20 shadow-xl py-4 flex flex-col items-center gap-6 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg tracking-wide ${
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
              className="text-sm text-luxury-dark/70 hover:text-luxury-gold"
            >
              Search
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm text-luxury-dark/70 hover:text-luxury-gold"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
