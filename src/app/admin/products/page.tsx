import { prisma } from "@/lib/prisma";
import { addProduct, deleteProduct } from "./actions";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif mb-8 text-luxury-dark">
        Manage Products
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-10">
        <h2 className="text-xl font-serif mb-4">Add New Product</h2>

        <form
          action={addProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (NGN)"
            required
            className="border p-2 rounded"
          />

          <select name="categoryId" required className="border p-2 rounded">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* IMAGE UPLOAD UI */}
          <div className="flex flex-col gap-2 border p-3 rounded bg-gray-50">
            <label className="text-sm font-bold text-gray-700">
              Option A: Upload Image (Saves as Base64)
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="text-sm bg-white p-1 border rounded"
            />

            <label className="text-sm font-bold text-gray-700 mt-2">
              Option B: Paste Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              placeholder="/images/filename.jpg"
              className="border p-2 rounded"
            />
          </div>

          <input
            type="text"
            name="sizes"
            placeholder="Sizes (e.g., S,M,L,XL)"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="colors"
            placeholder="Colors (e.g., Black,Cream)"
            className="border p-2 rounded"
          />

          {/* NEW ARRIVAL CHECKBOX */}
          <div className="flex items-center gap-2 col-span-1 md:col-span-2">
            <input
              type="checkbox"
              name="isNew"
              id="isNew"
              className="w-4 h-4 accent-luxury-gold"
            />
            <label htmlFor="isNew" className="text-sm font-bold text-gray-700">
              Mark as New Arrival
            </label>
          </div>

          <textarea
            name="description"
            placeholder="Description"
            required
            className="border p-2 rounded col-span-1 md:col-span-2"
          />

          <button
            type="submit"
            className="bg-luxury-gold text-white px-6 py-2 rounded col-span-1 md:col-span-2 hover:bg-luxury-gold/90 font-medium"
          >
            Save Product to Store
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Product</th>
              <th className="p-4 font-medium text-gray-600">Category</th>
              <th className="p-4 font-medium text-gray-600">Price</th>
              <th className="p-4 font-medium text-gray-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                  <div>
                    <span className="font-medium">{product.name}</span>
                    {product.isNew && (
                      <span className="ml-2 text-[10px] bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded-full font-bold uppercase">
                        New
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-gray-500">{product.category.name}</td>
                <td className="p-4 font-serif">
                  ₦{product.price.toLocaleString()} NGN
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="text-blue-500 hover:text-blue-700 p-2"
                    >
                      <Pencil size={18} />
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <button
                        type="submit"
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
