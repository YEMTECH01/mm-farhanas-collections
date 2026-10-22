import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";

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
    <div className="min-h-screen bg-[#f6f1e7] py-16 text-ink">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d9cbb2] bg-white/60 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-ink/70 transition-colors hover:border-gold-deep hover:text-gold-deep"
        >
          <ArrowLeft size={14} /> Back to Store
        </Link>

        <div className="grid gap-8 rounded-[28px] border border-[#e6dcc9] bg-white p-4 shadow-[0_22px_60px_rgba(11,11,12,0.05)] sm:p-6 lg:grid-cols-2 lg:p-8">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-[#f3ecdf]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center pb-8 lg:pb-0">
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-gold-deep">
              <span className="inline-block h-2 w-2 rounded-full bg-gold-deep" />
              Signature Piece
            </div>

            <h1 className="mb-4 font-serif text-4xl leading-none tracking-[-0.05em] text-ink sm:text-5xl">
              {product.name}
            </h1>

            <p className="mb-6 font-serif text-3xl text-gold-deep">
              ₦{product.price.toLocaleString()} NGN
            </p>

            <p className="mb-8 max-w-xl text-sm leading-relaxed text-ink/70">
              {product.description}. This beautiful piece is crafted with
              premium materials, designed to bring refined elegance to your
              everyday wardrobe.
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e4d6ba] bg-[#f8f3eb] px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-ink/75">
                <Truck size={14} className="text-gold-deep" />
                Shipping available
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e4d6ba] bg-[#f8f3eb] px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-ink/75">
                <ShieldCheck size={14} className="text-gold-deep" />
                Quality assured
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-ink/60">
                Available sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.split(",").map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-[#d9cbb2] bg-[#f9f5ef] px-4 py-2 text-sm text-ink"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-ink/60">
                Available colors
              </h3>
              <p className="text-sm text-ink/70">{product.colors}</p>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
