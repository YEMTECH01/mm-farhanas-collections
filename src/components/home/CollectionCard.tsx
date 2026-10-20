"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface CollectionCardProps {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  stock?: number;
}

export default function CollectionCard({
  id,
  title,
  subtitle,
  price,
  image,
  stock = 5,
}: CollectionCardProps) {
  const { addItem, toggleCart } = useCartStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      name: title,
      price,
      image,
      size: "M",
      color: "Cream",
      quantity: 1,
    });
    toggleCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <Link
        href={`/product/${id}`}
        className="relative aspect-[3/4] overflow-hidden bg-sand"
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur-md rounded-full text-ink hover:text-gold-deep transition-colors z-10"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={16} />
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 w-full p-3 translate-y-0 opacity-100 lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAdd}
            className="w-full bg-ink/90 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-gold-deep transition-colors"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </Link>

      <div className="pt-3 flex flex-col">
        <span className="label-sm text-ink/50 mb-1">{subtitle}</span>
        <h3 className="font-serif text-lg text-ink leading-tight mb-1">
          {title}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <span className="font-sans font-medium text-sm text-gold-deep">
            ₦{price.toLocaleString()}
          </span>
          {stock <= 3 && (
            <span className="text-[10px] text-red-600 font-medium tracking-wide uppercase">
              Only {stock} left
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
