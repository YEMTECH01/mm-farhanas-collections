import { prisma } from "@/lib/prisma";
import { updateCategory } from "../../actions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const category = await prisma.category.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!category) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateCategory(formData);
    redirect("/admin/categories");
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft size={16} /> Back to Categories
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-serif mb-6 text-luxury-dark">
          Edit Category
        </h1>

        <form action={handleUpdate} className="grid grid-cols-1 gap-4">
          <input type="hidden" name="id" value={category.id} />

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={category.name}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-2 border p-3 rounded bg-gray-50">
            <label className="text-sm font-bold text-gray-700">
              Option A: Upload New Image (Optional)
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="text-sm bg-white p-1 border rounded"
            />

            <label className="text-sm font-bold text-gray-700 mt-2">
              Option B: Use Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              defaultValue={category.image}
              className="border p-2 rounded"
            />

            <p className="text-xs text-gray-500 mt-2">Current Image:</p>
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 object-cover rounded border"
            />
          </div>

          <button
            type="submit"
            className="bg-luxury-gold text-white px-6 py-3 rounded hover:bg-luxury-gold/90 transition font-medium mt-4"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}
