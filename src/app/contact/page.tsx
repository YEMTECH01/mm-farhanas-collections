"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    // This formats the message and opens the user's email app
    const subject = encodeURIComponent(`New Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );

    window.location.href = `mailto:opeyemiakande666@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-luxury-beige py-20">
        <div className="max-w-xl mx-auto px-6">
          <h1 className="font-serif text-5xl text-luxury-dark text-center mb-8">
            Contact Us
          </h1>
          <div className="bg-white p-8 rounded-sm shadow-sm border border-luxury-gray">
            <form onSubmit={handleSend} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
              />
              <textarea
                placeholder="How can we help you?"
                rows={5}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-luxury-dark text-white py-3 tracking-widest hover:bg-black transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
