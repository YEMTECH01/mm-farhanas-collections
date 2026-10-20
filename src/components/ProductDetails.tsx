"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductDetails({ product }: { product: any }) {
  // Split the comma-separated string from the database into an array
  const availableSizes = product.sizes.split(",");
  const availableColors = product.colors.split(",");

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);

  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    toggleCart();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-sm shadow-sm border border-luxury-gray">
      {/* Left: Image */}
      <div className="relative aspect-[3/4] bg-luxury-cream rounded-sm overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right: Info & Options */}
      <div className="flex flex-col justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-luxury-dark/60 hover:text-luxury-gold mb-6"
        >
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <h1 className="font-serif text-4xl text-luxury-dark mb-2">
          {product.name}
        </h1>
        <p className="text-2xl font-serif text-luxury-gold mb-6">
          {product.price} AED
        </p>

        <p className="text-luxury-dark/70 mb-8">{product.description}</p>

        {/* Size Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-bold tracking-widest mb-3">
            SELECT SIZE
          </h3>
          <div className="flex gap-3">
            {availableSizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center border text-sm transition-colors ${
                  selectedSize === size
                    ? "border-luxury-gold bg-luxury-gold text-white"
                    : "border-luxury-gray bg-white hover:border-luxury-dark"
                }`}
              >
                {size.trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="mb-8">
          <h3 className="text-sm font-bold tracking-widest mb-3">
            SELECT COLOR
          </h3>
          <div className="flex gap-3">
            {availableColors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border text-sm transition-colors ${
                  selectedColor === color
                    ? "border-luxury-gold bg-luxury-gold text-white"
                    : "border-luxury-gray bg-white hover:border-luxury-dark"
                }`}
              >
                {color.trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-luxury-dark text-white py-4 tracking-widest hover:bg-luxury-gold transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} /> ADD TO BAG
        </button>
      </div>
    </div>
  );
}
