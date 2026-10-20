import { prisma } from "@/lib/prisma";
import { updateProduct } from "../../actions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateProduct(formData);
    redirect("/admin/products");
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-serif mb-6 text-luxury-dark">
          Edit Product
        </h1>

        <form
          action={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input type="hidden" name="id" value={product.id} />

          <input
            type="text"
            name="name"
            defaultValue={product.name}
            required
            className="border p-2 rounded"
            placeholder="Product Name"
          />
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            required
            className="border p-2 rounded"
            placeholder="Price (NGN)"
          />

          <select
            name="categoryId"
            defaultValue={product.categoryId}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex flex-col gap-2 border p-3 rounded bg-gray-50">
            <label className="text-sm font-bold text-gray-700">
              Upload New Image (Optional)
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="text-sm bg-white p-1 border rounded"
            />

            <label className="text-sm font-bold text-gray-700 mt-2">
              Or Edit Image URL/Base64
            </label>
            <input
              type="text"
              name="imageUrl"
              defaultValue={product.image}
              className="border p-2 rounded text-xs"
            />

            <p className="text-xs text-gray-500 mt-2">Current Image:</p>
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded border"
            />
          </div>

          <input
            type="text"
            name="sizes"
            defaultValue={product.sizes}
            className="border p-2 rounded"
            placeholder="Sizes"
          />
          <input
            type="text"
            name="colors"
            defaultValue={product.colors}
            className="border p-2 rounded"
            placeholder="Colors"
          />

          <div className="flex items-center gap-2 col-span-1 md:col-span-2">
            <input
              type="checkbox"
              name="isNew"
              id="isNew"
              defaultChecked={product.isNew}
              className="w-4 h-4 accent-luxury-gold"
            />
            <label htmlFor="isNew" className="text-sm font-bold text-gray-700">
              Mark as New Arrival
            </label>
          </div>

          <textarea
            name="description"
            defaultValue={product.description}
            required
            className="border p-2 rounded col-span-1 md:col-span-2"
            placeholder="Description"
          />

          <button
            type="submit"
            className="bg-luxury-gold text-white px-6 py-3 rounded col-span-1 md:col-span-2 hover:bg-luxury-gold/90 transition font-medium"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
