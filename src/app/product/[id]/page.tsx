import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-luxury-beige py-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-luxury-dark/60 hover:text-luxury-dark mb-8"
        >
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-sm shadow-sm border border-luxury-gray">
          <div className="relative w-full aspect-[3/4] bg-luxury-cream rounded-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center pb-20 md:pb-0">
            <h1 className="font-serif text-4xl text-luxury-dark mb-4">
              {product.name}
            </h1>

            {/* CHANGED TO NAIRA HERE */}
            <p className="text-2xl font-serif text-luxury-gold mb-6">
              ₦{product.price.toLocaleString()} NGN
            </p>

            <p className="text-luxury-dark/70 mb-8 leading-relaxed">
              {product.description}. This beautiful piece is crafted with
              premium materials, perfect for the modern queen.
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-bold tracking-widest mb-3">
                AVAILABLE SIZES
              </h3>
              <div className="flex gap-2">
                {product.sizes.split(",").map((size) => (
                  <span
                    key={size}
                    className="px-4 py-2 border border-luxury-gray text-sm rounded-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold tracking-widest mb-3">
                AVAILABLE COLORS
              </h3>
              <p className="text-sm text-luxury-dark/70">{product.colors}</p>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
