import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean; // <-- NEW: Controls the checkout modal
  toggleCart: () => void;
  toggleCheckout: () => void; // <-- NEW: Opens/closes checkout
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  isCheckoutOpen: false, // <-- NEW

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  // When we open checkout, we also close the cart drawer
  toggleCheckout: () =>
    set((state) => ({
      isCheckoutOpen: !state.isCheckoutOpen,
      isOpen: false,
    })),

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    })),

  clearCart: () => set({ items: [] }),
}));
