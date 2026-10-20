"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const {
    isOpen,
    toggleCart,
    items,
    removeItem,
    updateQuantity,
    toggleCheckout,
  } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-luxury-beige z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-luxury-dark/10 bg-white/50">
          <h2 className="font-serif text-xl tracking-wide text-luxury-dark">
            MY SHOPPING BAG
          </h2>
          <button
            onClick={toggleCart}
            className="text-luxury-dark hover:text-luxury-gold"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <p className="text-center text-luxury-dark/60 mt-10">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 border-b border-luxury-dark/10 pb-4"
                >
                  <div className="relative w-20 h-24 bg-white rounded-sm overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-md text-luxury-dark">
                        {item.name}
                      </h3>
                      <p className="text-xs text-luxury-dark/60 mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>

                      {/* CHANGED TO NAIRA HERE */}
                      <p className="text-sm font-medium mt-2">
                        ₦{item.price.toLocaleString()} NGN
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-white border border-luxury-dark/20 rounded-sm px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="hover:text-luxury-gold"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="hover:text-luxury-gold"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 bg-white/80 border-t border-luxury-dark/10">
          <div className="flex justify-between text-lg font-serif mb-4">
            <span>Subtotal:</span>
            {/* CHANGED TO NAIRA HERE */}
            <span>₦{subtotal.toLocaleString()} NGN</span>
          </div>
          <p className="text-xs text-luxury-gold mb-4 text-center">
            FREE SHIPPING! You qualify.
          </p>
          <button
            onClick={toggleCheckout}
            className="w-full bg-luxury-gold text-white py-4 text-sm tracking-widest hover:bg-luxury-gold/90 transition-colors"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
