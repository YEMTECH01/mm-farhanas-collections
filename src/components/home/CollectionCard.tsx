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
        className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-sand shadow-[0_12px_30px_rgba(11,11,12,0.06)]"
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/60 text-ink backdrop-blur-md transition-colors hover:text-gold-deep"
          onClick={(e) => e.preventDefault()}
          aria-label={`Save ${title}`}
        >
          <Heart size={16} />
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 w-full p-3 opacity-100 transition-all duration-300 lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink/90 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-gold-deep"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </Link>

      <div className="flex flex-col pt-3">
        <span className="mb-1 text-[10px] uppercase tracking-[0.22em] text-ink/50">
          {subtitle}
        </span>
        <h3 className="mb-1 font-serif text-xl leading-tight text-ink sm:text-[1.45rem]">
          {title}
        </h3>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="font-sans text-sm font-medium text-gold-deep">
            ₦{price.toLocaleString()}
          </span>
          {stock <= 3 && (
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-red-600">
              Only {stock} left
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
