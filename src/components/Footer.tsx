export default function Footer() {
  return (
    <footer className="w-full bg-ink text-ivory py-12 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <h2 className="font-serif text-2xl lg:text-3xl text-gold mb-6 tracking-wide">
          MM | FARHANA'S
        </h2>

        <p className="text-xs tracking-[0.15em] text-ivory/80 uppercase mb-4">
          MM | FARHANA'S COLLECTIONS <span className="mx-2 text-gold">•</span>{" "}
          Luxury Made Modest
        </p>

        <p className="text-xs text-ivory/50 mb-2 tracking-wide">
          Block C1, Shop 54, New Kuje Shopping Complex, Kuje, FCT, Nigeria
        </p>

        <p className="text-[10px] text-ivory/40 mb-8 tracking-widest uppercase">
          RC: 9714481
        </p>

        <div className="flex justify-center gap-6 mb-8 border-y border-ivory/10 py-6">
          <a
            href="https://wa.me/2349164042504"
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-widest text-ivory/60 hover:text-gold transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="https://tiktok.com/@hassana.haruna6"
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-widest text-ivory/60 hover:text-gold transition-colors"
          >
            TikTok
          </a>
          <a
            href="mailto:opeyemiakande666@gmail.com"
            className="text-xs uppercase tracking-widest text-ivory/60 hover:text-gold transition-colors"
          >
            Email
          </a>
        </div>

        <p className="text-[10px] text-ivory/40 tracking-widest uppercase">
          © {new Date().getFullYear()} MM | FARHANA'S COLLECTIONS. ALL RIGHTS
          RESERVED.
        </p>
      </div>
    </footer>
  );
}
