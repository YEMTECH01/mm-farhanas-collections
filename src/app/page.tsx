import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Collections from "@/components/home/Collections";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ color?: string; size?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <Navbar />
      <CartDrawer />
      <CheckoutModal />
      <main>
        <Hero />
        <Collections searchParams={resolvedSearchParams} />
      </main>

      <Footer />
    </>
  );
}
