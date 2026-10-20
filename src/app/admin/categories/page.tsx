import { prisma } from "@/lib/prisma";
import { addCategory, deleteCategory } from "./actions";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { products: true }, // To count how many products are in it
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif mb-8 text-luxury-dark">
        Manage Categories
      </h1>

      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-10">
        <h2 className="text-xl font-serif mb-4">Add New Category</h2>

        <form
          action={addCategory}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Category Name (e.g., Kids Abayas)"
            required
            className="border p-2 rounded col-span-1 md:col-span-2"
          />

          {/* IMAGE UPLOAD UI */}
          <div className="flex flex-col gap-2 border p-3 rounded bg-gray-50 col-span-1 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">
              Option A: Upload Image
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

          <button
            type="submit"
            className="bg-luxury-gold text-white px-6 py-2 rounded col-span-1 md:col-span-2 hover:bg-luxury-gold/90 font-medium"
          >
            Save Category
          </button>
        </form>
      </div>

      {/* Category List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Category</th>
              <th className="p-4 font-medium text-gray-600">Slug</th>
              <th className="p-4 font-medium text-gray-600">Products</th>
              <th className="p-4 font-medium text-gray-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="font-medium">{category.name}</span>
                </td>

                <td className="p-4 text-gray-500">/{category.slug}</td>

                <td className="p-4 text-gray-500">
                  {category.products.length} items
                </td>

                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {/* EDIT BUTTON */}
                    <Link
                      href={`/admin/categories/edit/${category.id}`}
                      className="text-blue-500 hover:text-blue-700 p-2"
                      title="Edit Category"
                    >
                      <Pencil size={18} />
                    </Link>

                    {/* DELETE BUTTON */}
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={category.id} />
                      <button
                        type="submit"
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete Category"
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
