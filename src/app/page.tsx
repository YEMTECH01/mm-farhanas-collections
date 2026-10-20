import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Collections from "@/components/home/Collections";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    color?: string;
    size?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <Collections searchParams={resolvedSearchParams} />
      </main>

      <Footer />
      <FloatingSocials />
    </div>
  );
}
