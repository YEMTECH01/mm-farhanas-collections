import { prisma } from "@/lib/prisma";
import CollectionCard from "@/components/home/CollectionCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function CollectionsPage() {
  const products = await prisma.product.findMany();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-luxury-beige py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-5xl text-luxury-dark text-center mb-12">
            All Collections
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <CollectionCard
                key={product.id}
                id={product.id}
                title={product.name}
                subtitle={product.description}
                items={1}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
