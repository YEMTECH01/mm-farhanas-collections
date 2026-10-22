"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes.split(",")[0] || "M",
      color: product.colors.split(",")[0] || "Black",
      quantity: 1,
    });
    toggleCart();
  };

  return (
    <button
      onClick={handleAddToCart}
      className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0b0b0c] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-all duration-200 hover:bg-[#1a1a1a]"
    >
      <ShoppingBag size={16} />
      Add to bag
    </button>
  );
}
