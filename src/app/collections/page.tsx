import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CollectionCard from "@/components/home/CollectionCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

const editorialLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default async function CollectionsPage() {
  const products = await prisma.product.findMany();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f6f1e7] pb-16 pt-28 text-ink">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
          <div className="rounded-full border border-[#d9cbb2] bg-[#f8f3eb]/80 px-4 py-3 shadow-[0_0_0_1px_rgba(217,203,178,0.2)] sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-col items-center sm:flex-row sm:items-end sm:gap-2">
                <span className="font-serif text-[0.9rem] font-black tracking-[0.08em] sm:text-[1.2rem]">
                  MM |
                </span>
                <span className="font-serif text-[0.8rem] font-black tracking-[0.12em] sm:text-[1.1rem]">
                  FARHANA'S
                </span>
              </div>
              <span className="font-sans text-[9px] uppercase tracking-[0.38em] text-ink/60">
                Collections
              </span>
            </div>
          </div>

          <div className="mt-10 border-t border-[#d9cbb2] pt-6">
            <p className="text-[10px] uppercase tracking-[0.42em] text-ink/60">
              Curated luxury essentials
            </p>
          </div>

          <nav className="mt-4 space-y-0 border-b border-[#d9cbb2] pb-4">
            {editorialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group flex items-center justify-between border-t border-[#d9cbb2] py-4 transition-colors hover:text-gold-deep ${link.href === "/collections" ? "text-gold-deep" : "text-ink"}`}
              >
                <span className="font-serif text-[clamp(3rem,7vw,8rem)] leading-[0.9] tracking-[-0.06em]">
                  {link.name}
                </span>
                <span className="text-xl text-gold-deep transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            ))}
          </nav>

          <section className="mt-12">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#d9cbb2] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-ink/60">
                  Signature pieces
                </p>
                <h2 className="mt-2 font-serif text-3xl leading-none tracking-[-0.04em] sm:text-5xl">
                  Featured edits
                </h2>
              </div>
              <Link
                href="/new-arrivals"
                className="hidden rounded-full border border-[#d9cbb2] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-ink/75 transition-colors hover:border-gold-deep hover:text-gold-deep sm:inline-flex"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
              {products.slice(0, 4).map((product) => (
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
          </section>
        </div>
      </main>
      <Footer />
      <FloatingSocials />
    </>
  );
}
