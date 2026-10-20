"use client";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingSocials() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsVisible(y < lastY || y < 100);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <div
      className={`fixed bottom-6 right-4 z-40 transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="https://wa.me/2349164042504"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3.5 rounded-full shadow-float flex items-center justify-center hover:scale-105 transition-transform"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
