import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "./actions";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Helper to color-code the status badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-yellow-100 text-yellow-800"; // Pending
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif mb-8 text-luxury-dark">
        Manage Orders
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Date</th>
              <th className="p-4 font-medium text-gray-600">Customer</th>
              <th className="p-4 font-medium text-gray-600">Delivery Info</th>
              <th className="p-4 font-medium text-gray-600">Items</th>
              <th className="p-4 font-medium text-gray-600">Total</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const parsedItems = JSON.parse(order.items);

                return (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{order.name}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-[200px]">
                      {order.address}, {order.city}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <ul className="list-disc pl-4 space-y-1">
                        {parsedItems.map((item: any, i: number) => (
                          <li key={i}>
                            {item.quantity}x {item.name} (Size: {item.size})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 font-serif font-bold text-luxury-dark">
                      ₦{order.total.toLocaleString()}
                    </td>
                    <td className="p-4">
                      {/* ORDER STATUS DROPDOWN */}
                      <form
                        action={updateOrderStatus}
                        className="flex flex-col gap-2"
                      >
                        <input type="hidden" name="id" value={order.id} />
                        <select
                          name="status"
                          defaultValue={order.status}
                          className={`text-xs font-bold px-2 py-1 rounded border-none outline-none cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button
                          type="submit"
                          className="text-[10px] bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 rounded transition-colors"
                        >
                          Update
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
