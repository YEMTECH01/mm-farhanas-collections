import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-luxury-beige py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl text-luxury-dark mb-8">
            Our Story
          </h1>
          <p className="text-lg text-luxury-dark/80 leading-relaxed mb-6">
            MM LUXURY is a premier fashion destination located in Abuja,
            Nigeria. We specialize in high-quality, modest elegance, dealing in
            all kinds of abayas.
          </p>
          <p className="text-lg text-luxury-dark/80 leading-relaxed">
            Whether you are shopping for Dubai, Egyptian, Morocco, or Turkey
            wears, or looking for tailored men's thobes, we offer both retail
            and wholesale options. Visit our store at the Newkuje Shopping
            Complex or reach out to us on WhatsApp to place an order today.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
