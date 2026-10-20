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
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-luxury-dark">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm">Welcome back, Admin</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-start justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              Total Revenue
            </h3>
            <p className="text-3xl font-serif text-luxury-dark">
              ₦{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-start justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              Total Orders
            </h3>
            <p className="text-3xl font-serif text-luxury-dark">
              {allOrders.length}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FileText size={24} />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-start justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              Pending Orders
            </h3>
            <p className="text-3xl font-serif text-luxury-dark">
              {pendingOrders}
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <Clock size={24} />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-start justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              Total Products
            </h3>
            <p className="text-3xl font-serif text-luxury-dark">
              {productCount}
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <ShoppingBag size={24} />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-serif text-luxury-dark">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-luxury-gold hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Customer</th>
              <th className="p-4 font-medium text-gray-600">Date</th>
              <th className="p-4 font-medium text-gray-600">Total</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No orders yet. They will appear here when customers checkout.
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{order.name}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-serif">
                    ₦{order.total.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Paid"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
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
  );
}
