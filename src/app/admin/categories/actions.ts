"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function addCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const imageUrlInput = formData.get("imageUrl") as string;
  const imageFile = formData.get("imageFile") as File;

  let finalImageUrl = imageUrlInput;

  // Handle File Upload
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
    const path = join(process.cwd(), "public/images", filename);

    await writeFile(path, buffer);
    finalImageUrl = `/images/${filename}`;
  }

  await prisma.category.create({
    data: {
      name,
      slug,
      image: finalImageUrl || "/images/placeholder.jpg",
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}
export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const imageUrlInput = formData.get("imageUrl") as string;
  const imageFile = formData.get("imageFile") as File;

  let finalImageUrl = imageUrlInput;

  // Handle File Upload
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
    const path = join(process.cwd(), "public/images", filename);

    await writeFile(path, buffer);
    finalImageUrl = `/images/${filename}`;
  }

  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug,
      image: finalImageUrl,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}