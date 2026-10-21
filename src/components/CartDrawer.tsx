"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    toggleCart,
    toggleCheckout,
    removeItem,
    updateQuantity,
  } = useCartStore();

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    toggleCart();
    toggleCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <button
        aria-label="Close cart"
        className="absolute inset-0"
        onClick={toggleCart}
      />

      <aside className="relative z-10 flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
              Your cart
            </p>
            <h2 className="font-serif text-2xl text-ink">Bag</h2>
          </div>

          <button
            onClick={toggleCart}
            className="rounded-full border border-hairline p-2 text-ink hover:text-gold-deep"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-ink/60">
              <ShoppingBag size={32} className="mb-3" />
              <p className="font-serif text-2xl text-ink">Your bag is empty</p>
              <p className="mt-2 text-sm">
                Add a few pieces to begin your order.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-hairline pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-ink">{item.name}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
                          {item.color} / {item.size}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs uppercase tracking-[0.2em] text-ink/50 hover:text-gold-deep"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-hairline px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 text-ink/70 hover:text-gold-deep"
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 text-ink/70 hover:text-gold-deep"
                          aria-label={`Increase quantity for ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="font-medium text-ink">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 border-t border-hairline bg-ivory p-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-[0_-10px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex items-center justify-between text-sm uppercase tracking-[0.2em] text-ink/60">
            <span>Subtotal</span>
            <span className="text-ink">₦{subtotal.toLocaleString()}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-ink py-3 text-xs uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-gold-deep disabled:cursor-not-allowed disabled:bg-ink/40"
          >
            Proceed to checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
