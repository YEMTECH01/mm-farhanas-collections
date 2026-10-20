"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react"; // <-- Added User
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { toggleCart, items } = useCartStore();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-ivory/90 backdrop-blur-md border-b border-hairline py-3 shadow-sm" : "bg-transparent py-5"}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="z-50 inline-flex items-center rounded-full border border-[#d9cbb2] bg-[#f6f1e7]/40 px-3 py-1.5 shadow-[0_0_0_1px_rgba(217,203,178,0.18)] transition-colors group hover:border-gold-deep"
          >
            <div className="flex flex-col items-center leading-none">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl lg:text-2xl tracking-[0.08em] font-black text-ink transition-colors group-hover:text-gold-deep">
                  MM |
                </span>
                <span className="font-serif text-xl lg:text-2xl tracking-[0.12em] font-black text-ink transition-colors group-hover:text-gold-deep">
                  FARHANA'S
                </span>
              </div>
              <span className="mt-1 font-serif text-[9px] lg:text-[10px] uppercase tracking-[0.28em] text-ink/70 transition-colors group-hover:text-gold-deep">
                Collections
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest hover:text-gold-deep transition-colors ${pathname === link.href ? "text-gold-deep font-semibold" : "text-ink/80"}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 z-50">
            {/* Search Link */}
            <Link
              href="/collections"
              aria-label="Search"
              className="hidden sm:flex text-ink hover:text-gold-deep"
            >
              <Search size={20} strokeWidth={1.5} />
            </Link>

            {/* Admin Link */}
            <Link
              href="/admin/login"
              aria-label="Admin"
              className="hidden sm:flex text-ink hover:text-gold-deep"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              aria-label="Cart"
              className="relative text-ink hover:text-gold-deep"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-gold-deep text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full translate-x-1 -translate-y-1">
                  {items.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-ink"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-[#f4efe7]"
          >
            <div className="flex items-center justify-between px-4 pb-3 pt-4">
              <div className="flex-1 min-w-0">
                <div className="inline-flex w-full max-w-[calc(100%-52px)] items-center justify-center rounded-full border border-[#d9cbb2] bg-[#f7f1e8]/60 px-3 py-2 shadow-[0_0_0_1px_rgba(217,203,178,0.18)]">
                  <div className="flex flex-col items-center leading-none">
                    <div className="flex items-center justify-center gap-2 text-ink">
                      <span className="font-serif text-[clamp(1.4rem,4vw,2.6rem)] font-black tracking-[0.08em]">
                        MM |
                      </span>
                      <span className="font-serif text-[clamp(1.25rem,3.5vw,2.15rem)] font-black tracking-[0.12em]">
                        FARHANA'S
                      </span>
                    </div>
                    <span className="mt-1 font-serif text-[9px] uppercase tracking-[0.34em] text-ink/70">
                      Collections
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="ml-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#d9cbb2] text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="border-t border-[#d9cbb2] px-4 pb-6 pt-6">
              <p className="text-[10px] uppercase tracking-[0.38em] text-ink/60">
                Curated luxury essentials
              </p>
            </div>

            <nav className="flex flex-1 flex-col px-0">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-[#d9cbb2] px-4"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-3 text-ink transition-colors hover:text-gold-deep"
                  >
                    <span className="font-serif text-[clamp(2.1rem,8vw,4.1rem)] leading-[0.9] tracking-[-0.04em]">
                      {link.name}
                    </span>
                    <span className="text-lg text-gold-deep">↗</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: navLinks.length * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-auto border-t border-[#d9cbb2] px-4 pb-8 pt-5"
              >
                <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ink/60">
                  <span>Connect</span>
                  <span className="h-px flex-1 bg-[#d9cbb2]" />
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-ink/80 transition-colors hover:text-gold-deep"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1b1b1b] text-[10px] font-semibold text-[#f7f1e8]">
                      N
                    </span>
                    Admin Login
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-ink transition-colors hover:text-gold-deep"
                  >
                    <span className="font-serif text-[clamp(2.1rem,8vw,4.1rem)] leading-[0.9] tracking-[-0.04em]">
                      Contact
                    </span>
                    <span className="text-lg text-gold-deep">↗</span>
                  </Link>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
