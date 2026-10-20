import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-luxury-beige">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 items-center px-6 lg:px-10 py-12 lg:py-20">
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <span className="inline-block bg-luxury-gold/20 text-luxury-dark text-xs tracking-[0.25em] px-4 py-2 rounded-sm mb-6">
            DUBAI LUXURY
          </span>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-luxury-dark mb-6">
            Modest Elegance
            <br />
            Made for Kings & Queens.
          </h1>

          <p className="text-luxury-dark/70 text-base leading-relaxed max-w-lg mb-10">
            Timeless abayas crafted for the modern queen & king. Discover our
            curated collections of luxury abayas, inspired by the heritage of
            Dubai, Egypt, Morocco, and Turkey.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="bg-luxury-gold hover:bg-luxury-gold/90 text-white text-sm tracking-wide px-8 py-4 transition-colors"
            >
              Shop The Collection
            </Link>
            <Link
              href="/collections"
              className="border border-luxury-dark text-luxury-dark hover:bg-luxury-dark hover:text-white text-sm tracking-wide px-8 py-4 transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 lg:order-2 relative">
          <div
            className="w-full aspect-[4/3] lg:aspect-[5/4] bg-cover bg-center rounded-sm shadow-md"
            style={{
              backgroundImage: "url('/images/hero-silk.jpg')",
            }}
          />
        </div>
      </div>
    </section>
  );
}
