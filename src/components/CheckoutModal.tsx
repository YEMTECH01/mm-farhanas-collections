"use client";

import { useCartStore } from "@/store/useCartStore";
import { X } from "lucide-react";
import { useState } from "react";
import { createOrder } from "@/app/admin/orders/actions";

export default function CheckoutModal() {
  const { items, isCheckoutOpen, toggleCheckout, clearCart } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleSendWhatsApp = async () => {
    // 1. Save to Database
    await createOrder({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      total: subtotal,
      items: items,
    });

    // 2. Format the order details beautifully
    const orderItems = items
      .map(
        (item) =>
          `▪️ ${item.quantity}x ${item.name} (Size: ${item.size}, Color: ${item.color}) - ₦${(item.price * item.quantity).toLocaleString()}`,
      )
      .join("%0A"); // %0A is the WhatsApp code for a new line

    const message =
      `*NEW ORDER - MM LUXURY*%0A%0A` +
      `*Customer Details:*%0A` +
      `👤 Name: ${formData.name}%0A` +
      `📞 Phone: ${formData.phone}%0A` +
      `📍 Address: ${formData.address}, ${formData.city}%0A%0A` +
      `*Items Ordered:*%0A` +
      `${orderItems}%0A%0A` +
      `*Total Amount:* ₦${subtotal.toLocaleString()} NGN%0A%0A` +
      `_Please send payment details so I can complete my order._`;

    // 3. Open WhatsApp with your number
    window.open(`https://wa.me/2349164042504?text=${message}`, "_blank");

    // 4. Clear cart and close
    clearCart();
    toggleCheckout();
    setIsSuccess(false); // Reset for next time
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-luxury-beige w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl flex flex-col md:flex-row relative">
        <button
          onClick={toggleCheckout}
          className="absolute top-4 right-4 text-luxury-dark hover:text-red-500 z-10 bg-white/80 rounded-full p-1"
        >
          <X size={24} />
        </button>

        {!isSuccess ? (
          <>
            {/* Left Side: Form */}
            <form onSubmit={handlePlaceOrder} className="p-8 flex-1">
              <h2 className="font-serif text-2xl text-luxury-dark mb-6 border-b border-luxury-dark/20 pb-4">
                Checkout
              </h2>

              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest text-luxury-dark/70">
                  SHIPPING DETAILS
                </h3>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number (WhatsApp)"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
                />
                <input
                  required
                  type="text"
                  placeholder="Delivery Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
                />
                <input
                  required
                  type="text"
                  placeholder="City / State"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-luxury-gray rounded-sm focus:outline-none focus:border-luxury-gold"
                />

                <button
                  type="submit"
                  className="w-full bg-luxury-dark text-white py-4 mt-6 tracking-widest hover:bg-black transition-colors"
                >
                  CONTINUE TO ORDER SUMMARY (₦{subtotal.toLocaleString()})
                </button>
              </div>
            </form>

            {/* Right Side: Order Summary */}
            <div className="bg-white/50 p-8 w-full md:w-80 border-l border-luxury-gray">
              <h3 className="font-serif text-lg mb-4">Order Summary</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-sm"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="mt-1 font-serif">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-luxury-gray">
                <div className="flex justify-between font-bold text-lg font-serif">
                  <span>Total</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* SUCCESS / WHATSAPP SCREEN */
          <div className="p-10 w-full flex flex-col items-center justify-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-green-600"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl text-luxury-dark mb-2">
              Order Ready!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Click the button below to send your order details directly to our
              WhatsApp. We will reply with the payment details immediately.
            </p>

            <button
              onClick={handleSendWhatsApp}
              className="w-full max-w-sm bg-[#25D366] text-white py-4 tracking-widest hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 font-bold rounded-sm shadow-md"
            >
              SEND ORDER TO WHATSAPP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
