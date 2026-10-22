import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CollectionCard from "./CollectionCard";
import FilterSidebar from "./FilterSidebar";
import SortDropdown from "./SortDropdown";
import { collections as featuredCollections } from "@/data/collections";

export default async function Collections({
  searchParams,
}: {
  searchParams: {
    color?: string;
    size?: string;
    category?: string;
    sort?: string;
  };
}) {
  const query: any = {};

  if (searchParams.color) query.colors = { contains: searchParams.color };
  if (searchParams.size) query.sizes = { contains: searchParams.size };
  if (searchParams.category) query.category = { slug: searchParams.category };

  let orderBy: any = { createdAt: "desc" };
  if (searchParams.sort === "price-asc") orderBy = { price: "asc" };
  if (searchParams.sort === "price-desc") orderBy = { price: "desc" };

  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({ where: query, orderBy });

  return (
    <section className="w-full bg-ivory py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-gold-deep">
              Curated lifestyle
            </p>
            <h2 className="font-serif text-4xl text-ink lg:text-5xl">
              Our Collections
            </h2>
          </div>

          <Link
            href="/collections"
            className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-ink hover:text-gold-deep lg:inline-flex"
          >
            View all
          </Link>
        </div>

        <div className="mb-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {featuredCollections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-[22px] border border-[#e6dcc9] bg-white shadow-[0_18px_45px_rgba(11,11,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(11,11,12,0.08)]"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c]/75 via-[#0b0b0c]/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-gold">
                    {collection.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl leading-none sm:text-3xl">
                    {collection.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-ivory/80">
                    <span>{collection.items} pieces</span>
                    <span>Explore</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="hidden w-64 flex-shrink-0 lg:block">
            <FilterSidebar categories={categories} />
          </div>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between border-b border-sand pb-4">
              <button className="border border-sand px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink lg:hidden">
                Filters
              </button>

              <div className="ml-auto">
                <SortDropdown />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {products.length === 0 ? (
                <p className="col-span-full py-10 text-center text-ink/60">
                  No products found matching your filters.
                </p>
              ) : (
                products.map((product) => (
                  <CollectionCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    subtitle={product.description}
                    price={product.price}
                    image={product.image}
                    stock={5}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
