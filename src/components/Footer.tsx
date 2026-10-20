export default function Footer() {
  return (
    <footer className="w-full bg-luxury-dark text-white py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        {/* Brand Tagline */}
        <p className="text-xs tracking-[0.15em] text-white/80 uppercase mb-4">
          MM FARHANA'S COLLECTIONS{" "}
          <span className="mx-2 text-luxury-gold">•</span>
          Luxury Made Modest
        </p>

        {/* Official Address & RC Number */}
        <p className="text-xs text-white/60 mb-2 tracking-wide">
          Block C1, Shop 54, New Kuje Shopping Complex, Kuje, FCT, Nigeria
        </p>
        <p className="text-[10px] text-white/50 mb-4 tracking-widest uppercase">
          RC: 9714481
        </p>

        {/* Copyright */}
        <p className="text-[10px] text-white/40 tracking-widest uppercase border-t border-white/10 pt-4">
          © {new Date().getFullYear()} MM FARHANA'S COLLECTIONS. ALL RIGHTS
          RESERVED.
        </p>
      </div>
    </footer>
  );
}
