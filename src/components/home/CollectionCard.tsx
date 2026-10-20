"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag } from "lucide-react";

interface CollectionCardProps {
  id: string;
  title: string;
  subtitle: string;
  items: number;
  image: string;
}

export default function CollectionCard({
  id,
  title,
  subtitle,
  items,
  image,
}: CollectionCardProps) {
  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: id,
      name: title,
      price: 350, // <-- You can change this default quick-add price
      image: image,
      size: "M",
      color: "Cream",
      quantity: 1,
    });
    toggleCart();
  };

  return (
    <div className="group bg-white border border-luxury-gray rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/product/${id}`}>
        <div className="relative w-full aspect-[3/4] bg-luxury-cream overflow-hidden cursor-pointer">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full bg-luxury-dark/90 hover:bg-luxury-gold text-white text-xs tracking-widest py-3 flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer"
            >
              <ShoppingBag size={14} /> QUICK ADD
            </button>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/product/${id}`}>
          <h3 className="font-serif text-xl text-luxury-dark mb-2 hover:text-luxury-gold transition-colors">
            {title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-luxury-gray/50">
          <p className="text-xs text-luxury-dark/60 tracking-wide">
            {subtitle} • {items} Items
          </p>
        </div>
      </div>
    </div>
  );
}
