import { prisma } from "@/lib/prisma";
import CollectionCard from "./CollectionCard";
import FilterSidebar from "./FilterSidebar";
import SortDropdown from "./SortDropdown";

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
  // Build the Prisma query based on the URL parameters
  const query: any = {};

  if (searchParams.color) {
    query.colors = { contains: searchParams.color };
  }
  if (searchParams.size) {
    query.sizes = { contains: searchParams.size };
  }
  if (searchParams.category) {
    query.category = { slug: searchParams.category }; // Filter by Category
  }

  // Handle Sorting
  let orderBy: any = { createdAt: "desc" }; // Default: Newest first
  if (searchParams.sort === "price-asc") orderBy = { price: "asc" };
  if (searchParams.sort === "price-desc") orderBy = { price: "desc" };

  // Fetch categories for the sidebar
  const categories = await prisma.category.findMany();

  // Fetch products
  const products = await prisma.product.findMany({
    where: query,
    orderBy: orderBy,
  });

  return (
    <section className="w-full bg-luxury-cream py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl text-luxury-dark mb-4">
            Our Collections
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-16 bg-luxury-gold/50" />
            <span className="text-luxury-gold text-lg">✦</span>
            <span className="h-[1px] w-16 bg-luxury-gold/50" />
          </div>
        </div>

        {/* Main Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Pass categories to the sidebar */}
          <FilterSidebar categories={categories} />

          <div className="flex-1">
            {/* Sorting Dropdown - We use the separate client component here */}
            <div className="flex justify-end mb-6">
              <SortDropdown />
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.length === 0 ? (
                <p className="col-span-full text-center text-luxury-dark/60 py-10">
                  No products found matching your filters.
                </p>
              ) : (
                products.map((product) => (
                  <CollectionCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    subtitle={product.description}
                    items={1}
                    image={product.image}
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
