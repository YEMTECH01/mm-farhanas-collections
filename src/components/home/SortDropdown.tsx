"use client";

import { useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  return (
    <select
      defaultValue={currentSort}
      onChange={(e) => {
        const url = new URL(window.location.href);
        if (e.target.value) url.searchParams.set("sort", e.target.value);
        else url.searchParams.delete("sort");
        window.location.href = url.toString();
      }}
      className="flex items-center gap-2 bg-white border border-luxury-gray px-4 py-2 text-sm text-luxury-dark rounded-sm outline-none cursor-pointer"
    >
      <option value="">Sort By: Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
