"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  name: string;
  phone: string;
  address: string;
  city: string;
  total: number;
  items: any[];
}) {
  await prisma.order.create({
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      total: data.total,
      items: JSON.stringify(data.items), // Save the cart as a string
    },
  });

  revalidatePath("/admin/orders");
}
export async function updateOrderStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
