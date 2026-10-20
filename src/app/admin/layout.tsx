"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  ArrowLeft,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  saveAdminCredentials,
  getLocalAdminCredentials,
} from "@/lib/admin-credentials";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Categories", href: "/admin/categories", icon: Layers },
  { name: "Orders", href: "/admin/orders", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [newUsername, setNewUsername] = useState("admin");
  const [newPassword, setNewPassword] = useState("luxury2024");
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleResetCredentials = (event: React.FormEvent) => {
    event.preventDefault();

    const stored = getLocalAdminCredentials();
    const username = newUsername.trim();
    const password = newPassword.trim();

    if (!username || !password) {
      setResetMessage("Please enter both a username and password.");
      return;
    }

    const success = saveAdminCredentials(username, password);

    if (success) {
      setResetMessage("Admin login updated successfully.");
      setNewUsername(username);
      setNewPassword(password);
      setTimeout(() => setShowResetForm(false), 1200);
    } else {
      setResetMessage("Could not update admin login.");
    }
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between border-b border-ivory/10 p-5">
        <div className="inline-flex items-center justify-center rounded-full border border-[#d9cbb2]/70 bg-[#f7f1e8]/5 px-3 py-2 shadow-[0_0_0_1px_rgba(217,203,178,0.12)]">
          <div className="flex flex-col items-center leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-[1.05rem] tracking-[0.04em] text-gold">
                MM |
              </span>
              <span className="font-serif text-[0.9rem] tracking-[0.1em] text-ivory">
                FARHANA'S
              </span>
            </div>
            <span className="mt-1 font-serif text-[8px] uppercase tracking-[0.28em] text-ivory/60">
              ADMIN
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="text-ivory/50 hover:text-ivory lg:hidden"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm ${pathname === item.href ? "bg-gold/10 text-gold" : "text-ivory/70 hover:bg-ivory/5 hover:text-ivory"}`}
          >
            <item.icon size={18} /> {item.name}
          </Link>
        ))}
      </nav>
      <div className="space-y-2 border-t border-ivory/10 p-4">
        {hasMounted && (
          <>
            <button
              type="button"
              onClick={() => setShowResetForm((value) => !value)}
              className="w-full rounded-sm border border-[#d9cbb2]/30 bg-[#f7f1e8]/5 px-4 py-3 text-left text-sm text-ivory transition-colors hover:bg-[#f7f1e8]/10"
            >
              Reset Admin Access
            </button>

            {showResetForm && (
              <form
                onSubmit={handleResetCredentials}
                className="space-y-2 rounded-sm border border-ivory/10 bg-ivory/5 p-3"
              >
                <input
                  type="text"
                  value={newUsername}
                  onChange={(event) => setNewUsername(event.target.value)}
                  placeholder="Username"
                  className="w-full border border-ivory/15 bg-transparent px-2 py-2 text-sm text-ivory placeholder:text-ivory/50 focus:outline-none"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Password"
                  className="w-full border border-ivory/15 bg-transparent px-2 py-2 text-sm text-ivory placeholder:text-ivory/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-sm bg-gold px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-90"
                >
                  Save
                </button>
                {resetMessage && (
                  <p className="text-[10px] text-ivory/70">{resetMessage}</p>
                )}
              </form>
            )}
          </>
        )}

        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm px-4 py-3 text-sm text-ivory/70 transition-colors hover:bg-ivory/5 hover:text-ivory"
        >
          <ArrowLeft size={16} /> Back to Store
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-ivory text-ink">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-ink text-ivory flex-col flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-ink text-ivory z-50 flex flex-col lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-sand px-4 py-3 flex items-center justify-between">
          <span className="font-serif font-bold text-lg">Admin</span>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-ink"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
