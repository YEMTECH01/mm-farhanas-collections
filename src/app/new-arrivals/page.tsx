import { prisma } from "@/lib/prisma";
import CollectionCard from "@/components/home/CollectionCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

export default async function NewArrivalsPage() {
  const products = await prisma.product.findMany({
    where: { isNew: true },
  });

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
          <div className="text-center mb-12">
            <h1 className="text-ink mb-4">New Arrivals</h1>
            <p className="text-ink/60 text-sm tracking-widest uppercase">
              The Latest Drops
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {products.length === 0 ? (
              <p className="col-span-full text-center text-ink/60 py-10">
                No new arrivals at the moment.
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
      </main>

      <Footer />
      <FloatingSocials />
    </div>
  );
}
