"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface FilterSidebarProps {
  categories: { id: string; name: string; slug: string }[];
}

export default function FilterSidebar({ categories }: FilterSidebarProps) {
  const [openSection, setOpenSection] = useState<string | null>("category");
  const searchParams = useSearchParams();

  const currentColor = searchParams.get("color");
  const currentSize = searchParams.get("size");
  const currentCategory = searchParams.get("category");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Helper to build URLs that keep existing filters intact
  const buildUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key); // Unselect if clicked again
    } else {
      params.set(key, value);
    }
    return `/?${params.toString()}`;
  };

  const colors = ["Black", "Cream", "Patterned", "White", "Beige", "Blue"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 bg-[#EAD9B6]/30 p-5 rounded-sm border border-luxury-gray/50">
      <div className="flex justify-between items-center mb-4 border-b border-luxury-dark/20 pb-2">
        <h3 className="font-serif text-xl text-luxury-dark">Filter By:</h3>
        {/* Clear Filters Button */}
        {(currentColor || currentSize || currentCategory) && (
          <Link href="/" className="text-xs text-red-500 hover:underline">
            Clear All
          </Link>
        )}
      </div>

      {/* CATEGORY FILTER */}
      <div className="border-b border-luxury-dark/10 py-3">
        <button
          onClick={() => toggleSection("category")}
          className="flex w-full items-center justify-between font-medium text-sm tracking-wide"
        >
          Category
          {openSection === "category" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSection === "category" && (
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={buildUrl("category", cat.slug)}
                className={`${currentCategory === cat.slug ? "text-luxury-gold font-bold" : "text-luxury-dark/70 hover:text-luxury-dark"}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="border-b border-luxury-dark/10 py-3">
        <button
          onClick={() => toggleSection("color")}
          className="flex w-full items-center justify-between font-medium text-sm tracking-wide"
        >
          Color
          {openSection === "color" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSection === "color" && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {colors.map((item) => (
              <Link
                key={item}
                href={buildUrl("color", item)}
                className={`px-3 py-1 rounded-sm border cursor-pointer transition-colors ${
                  currentColor === item
                    ? "bg-luxury-gold text-white border-luxury-gold"
                    : "bg-white border-luxury-gray hover:border-luxury-gold"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="border-b border-luxury-dark/10 py-3">
        <button
          onClick={() => toggleSection("size")}
          className="flex w-full items-center justify-between font-medium text-sm tracking-wide"
        >
          Size
          {openSection === "size" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSection === "size" && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {sizes.map((item) => (
              <Link
                key={item}
                href={buildUrl("size", item)}
                className={`px-3 py-1 rounded-sm border cursor-pointer transition-colors ${
                  currentSize === item
                    ? "bg-luxury-gold text-white border-luxury-gold"
                    : "bg-white border-luxury-gray hover:border-luxury-gold"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
