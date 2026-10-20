export default function Footer() {
  return (
    <footer className="w-full bg-luxury-dark text-white py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        {/* Brand Tagline */}
        <p className="text-xs tracking-[0.15em] text-white/80 uppercase mb-4">
          MM LUXURY <span className="mx-2 text-luxury-gold">•</span>
          Free Shipping on Orders Over ₦50,000{" "}
          <span className="mx-2 text-luxury-gold">•</span>
          Luxury Made Modest
        </p>

        {/* Physical Address */}
        <p className="text-xs text-white/60 mb-4 tracking-wide">
          Kuje Office, Block C1-54 Newkuje Shopping Complex, Abuja
        </p>

        {/* Copyright */}
        <p className="text-[10px] text-white/40 tracking-widest uppercase">
          © {new Date().getFullYear()} MM LUXURY. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
