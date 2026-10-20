import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <div className="w-full bg-luxury-dark text-white py-2 text-[10px] md:text-xs tracking-[0.1em] uppercase font-medium">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-wrap justify-center items-center gap-2 md:gap-4 text-center">
        <span>Free Express Shipping for a limited time</span>
        <span className="hidden md:inline text-luxury-gold">|</span>
        <Link href="#" className="hover:text-luxury-gold transition-colors">
          Sign up for our Newsletter & GET 10% OFF
        </Link>
        <span className="hidden md:inline text-luxury-gold">|</span>
        <Link href="#" className="hover:text-luxury-gold transition-colors">
          Store Locator
        </Link>
        <span className="hidden md:inline text-luxury-gold">|</span>
        <Link href="#" className="hover:text-luxury-gold transition-colors">
          Live Chat
        </Link>
      </div>
    </div>
  );
}
