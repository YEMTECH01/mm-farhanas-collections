import { prisma } from "@/lib/prisma";
import CollectionCard from "@/components/home/CollectionCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

export default async function CollectionsPage() {
  const products = await prisma.product.findMany();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10">
          <h1 className="text-center text-ink mb-12">All Collections</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {products.map((product) => (
              <CollectionCard 
                key={product.id} 
                id={product.id}
                title={product.name}
                subtitle={product.description}
                price={product.price}
                image={product.image}
                stock={5} 
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingSocials />
    </>
  );
}