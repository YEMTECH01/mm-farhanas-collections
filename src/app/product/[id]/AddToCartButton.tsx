"use client";

import { useCartStore } from "@/store/useCartStore";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes.split(",")[0] || "M", // Defaults to the first size
      color: product.colors.split(",")[0] || "Black", // Defaults to the first color
      quantity: 1,
    });
    toggleCart(); // Opens the cart drawer
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-luxury-dark text-white py-4 tracking-widest hover:bg-black transition-colors cursor-pointer"
    >
      ADD TO BAG
    </button>
  );
}