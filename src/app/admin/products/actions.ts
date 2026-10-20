"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper to convert uploaded file to Base64 string
async function fileToBase64(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  const sizes = formData.get("sizes") as string;
  const colors = formData.get("colors") as string;
  const isNew = formData.get("isNew") === "on";

  const imageUrlInput = formData.get("imageUrl") as string;
  const imageFile = formData.get("imageFile") as File;

  let finalImageUrl = imageUrlInput;

  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await fileToBase64(imageFile);
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
      image: finalImageUrl || "",
      sizes: sizes || "S,M,L",
      colors: colors || "Black,Cream",
      isNew: isNew,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/new-arrivals");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryId = formData.get("categoryId") as string;
  const sizes = formData.get("sizes") as string;
  const colors = formData.get("colors") as string;
  const isNew = formData.get("isNew") === "on";

  const imageUrlInput = formData.get("imageUrl") as string;
  const imageFile = formData.get("imageFile") as File;

  let finalImageUrl = imageUrlInput;

  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await fileToBase64(imageFile);
  }

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      categoryId,
      image: finalImageUrl,
      sizes,
      colors,
      isNew,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/new-arrivals");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}
