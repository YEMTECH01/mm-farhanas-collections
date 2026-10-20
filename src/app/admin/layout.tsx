import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  ArrowLeft,
  FileText,
  LogOut,
} from "lucide-react";
import { signOut } from "@/auth"; // Make sure this is imported

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-dark text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-serif text-2xl tracking-widest text-luxury-gold">
            MM ADMIN
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition"
          >
            <ShoppingBag size={20} /> Products
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition"
          >
            <Layers size={20} /> Categories
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition"
          >
            <FileText size={20} /> Orders
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition text-sm"
          >
            <ArrowLeft size={16} /> Back to Store
          </Link>

          {/* SIGN OUT BUTTON */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded hover:bg-red-500/20 text-red-400 transition text-sm cursor-pointer"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
