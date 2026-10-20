"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h1 className="font-serif text-5xl text-luxury-dark mb-6">
              Get in Touch
            </h1>
            <p className="text-luxury-dark/70 mb-8 leading-relaxed">
              We would love to hear from you. Visit our physical store or send
              us a message for enquiries, wholesale orders, or custom designs.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-luxury-gold mt-1" />
                <div>
                  <h3 className="font-bold text-luxury-dark">
                    Visit Our Store
                  </h3>
                  <p className="text-sm text-luxury-dark/70">
                    Block C1, Shop 54,
                    <br />
                    New Kuje Shopping Complex,
                    <br />
                    Kuje, FCT, Nigeria.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-luxury-gold mt-1" />
                <div>
                  <h3 className="font-bold text-luxury-dark">
                    Call / WhatsApp
                  </h3>
                  <p className="text-sm text-luxury-dark/70">
                    +234 916 404 2504
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-luxury-gold mt-1" />
                <div>
                  <h3 className="font-bold text-luxury-dark">Email Us</h3>
                  <p className="text-sm text-luxury-dark/70">
                    opeyemiakande666@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-sm shadow-sm border border-luxury-gray h-fit">
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
