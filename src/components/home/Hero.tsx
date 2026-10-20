"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b0b0c]">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/80 to-[#0b0b0c]/25" />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-28 lg:px-10 lg:pb-20 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center px-1 py-1"
        >
          <span className="h-3 w-3 rounded-full bg-gold-sheen shadow-[0_0_18px_rgba(201,169,110,0.8)]" />
          <span className="ml-3 h-px w-12 bg-white/15" />
        </motion.div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <span className="mb-4 block text-[10px] uppercase tracking-[0.25em] text-gold">
              Kuje, Abuja • Est. 2026
            </span>

            <h1 className="mb-6 text-ivory leading-[0.94] tracking-[-0.04em]">
              Modest Elegance.
              <br />
              Made for royalty.
            </h1>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-ivory/75 lg:text-base">
              Timeless abayas and thobes crafted for the modern royal. Discover
              our curated collections inspired by the heritage of Dubai, Egypt,
              Morocco, and Turkey.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/collections"
                className="bg-gold-sheen px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="border border-white/25 bg-white/5 px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-white/10"
              >
                Our Story
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-[24px] bg-[#f6f1e7]/8 p-4 backdrop-blur-[2px]"
          >
            <div className="rounded-[18px] bg-[#f6f1e7]/5 p-4 text-ivory">
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-gold/90">
                Signature edit
              </p>
              <h2 className="font-serif text-3xl leading-none text-ivory">
                Royal
                <br />
                Minimal
              </h2>
              <div className="mt-6 h-28 overflow-hidden rounded-[14px] bg-[#d9cbb2]/10">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=900&auto=format&fit=crop')",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
