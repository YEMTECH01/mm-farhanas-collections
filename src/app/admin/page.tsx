import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Layers,
  DollarSign,
  FileText,
  Clock,
} from "lucide-react";

export default async function AdminDashboard() {
  // Fetch counts
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();

  // Fetch orders
  const allOrders = await prisma.order.findMany();
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  // Calculate Metrics
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = allOrders.filter((o) => o.status === "Pending").length;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h1 className="font-serif text-[clamp(3.2rem,6vw,8rem)] leading-[0.9] tracking-[-0.05em] text-luxury-dark">
          Dashboard Overview
        </h1>
        <p className="text-sm uppercase tracking-[0.2em] text-luxury-dark/60">
          Welcome back, Admin
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-start justify-between rounded-[1.4rem] border border-[#dfe3db] bg-[#f8f7f5] p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <div>
            <h3 className="mb-3 text-[0.9rem] font-medium text-luxury-dark/70">
              Total Revenue
            </h3>
            <p className="font-serif text-[2.3rem] leading-none tracking-[-0.05em] text-luxury-dark">
              ₦{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#cfead6] text-[#1c3c2e]">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="flex items-start justify-between rounded-[1.4rem] border border-[#dfe3db] bg-[#f8f7f5] p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <div>
            <h3 className="mb-3 text-[0.9rem] font-medium text-luxury-dark/70">
              Total Orders
            </h3>
            <p className="font-serif text-[2.3rem] leading-none tracking-[-0.05em] text-luxury-dark">
              {allOrders.length}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dfeafb] text-[#334d7a]">
            <FileText size={22} />
          </div>
        </div>

        <div className="flex items-start justify-between rounded-[1.4rem] border border-[#dfe3db] bg-[#f8f7f5] p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <div>
            <h3 className="mb-3 text-[0.9rem] font-medium text-luxury-dark/70">
              Pending Orders
            </h3>
            <p className="font-serif text-[2.3rem] leading-none tracking-[-0.05em] text-luxury-dark">
              {pendingOrders}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4e9b8] text-[#7a6600]">
            <Clock size={22} />
          </div>
        </div>

        <div className="flex items-start justify-between rounded-[1.4rem] border border-[#dfe3db] bg-[#f8f7f5] p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <div>
            <h3 className="mb-3 text-[0.9rem] font-medium text-luxury-dark/70">
              Total Products
            </h3>
            <p className="font-serif text-[2.3rem] leading-none tracking-[-0.05em] text-luxury-dark">
              {productCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7d8f8] text-[#5f3a8a]">
            <ShoppingBag size={22} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-[#dfe3db] bg-[#f8f7f5]">
        <div className="flex items-center justify-between border-b border-[#dfe3db] px-6 py-5">
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4rem)] leading-[0.9] tracking-[-0.06em] text-luxury-dark">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-luxury-dark/70 transition-colors hover:text-luxury-gold"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b border-[#dfe3db] bg-[#f1f1ee]">
              <tr>
                <th className="p-4 text-left text-sm font-medium uppercase tracking-[0.12em] text-luxury-dark/70">
                  Customer
                </th>
                <th className="p-4 text-left text-sm font-medium uppercase tracking-[0.12em] text-luxury-dark/70">
                  Date
                </th>
                <th className="p-4 text-left text-sm font-medium uppercase tracking-[0.12em] text-luxury-dark/70">
                  Total
                </th>
                <th className="p-4 text-left text-sm font-medium uppercase tracking-[0.12em] text-luxury-dark/70">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No orders yet. They will appear here when customers
                    checkout.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#e7e4df] last:border-0 hover:bg-white/60"
                  >
                    <td className="p-4 text-base font-medium text-luxury-dark">
                      {order.name}
                    </td>
                    <td className="p-4 text-sm text-luxury-dark/70">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-serif text-xl text-luxury-dark">
                      ₦{order.total.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                          order.status === "Pending"
                            ? "border-[#eadc7f] bg-[#f7f0c9] text-[#7a6600]"
                            : order.status === "Paid"
                              ? "border-[#b0cfe6] bg-[#dfeefb] text-[#295a84]"
                              : order.status === "Shipped"
                                ? "border-[#dcc8f2] bg-[#efe4fb] text-[#5e3b8d]"
                                : "border-[#c7e7d2] bg-[#dff3e6] text-[#1e5d3e]"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
