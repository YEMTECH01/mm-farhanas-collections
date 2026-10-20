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
    <header className="w-full bg-luxury-beige relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-2 z-50">
          <span className="font-serif text-2xl lg:text-3xl tracking-wide text-luxury-dark">
            MM FARHANA'S
          </span>
          <span className="font-serif text-2xl lg:text-3xl tracking-[0.1em] text-luxury-dark">
            COLLECTIONS
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
                className={`text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-luxury-dark border-b border-luxury-gold pb-1"
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
          {/* SEARCH ICON (Links to Collections page) */}
          <Link
            href="/collections"
            aria-label="Search"
            className="hidden sm:block hover:text-luxury-gold transition-colors"
          >
            <Search size={20} strokeWidth={1.5} />
          </Link>

          {/* USER ICON (Links to Admin Login) */}
          <Link
            href="/admin/login"
            aria-label="Account"
            className="hidden sm:block hover:text-luxury-gold transition-colors"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>

          {/* CART ICON */}
          <button
            onClick={toggleCart}
            aria-label="Cart"
            className="relative hover:text-luxury-gold transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-luxury-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>

          {/* Hamburger Button (Mobile Only) */}
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
                pathname === link.href ? "text-luxury-gold" : "text-luxury-dark"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Search & User links */}
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
