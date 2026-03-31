import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const id =
            item._id ||
            item.id ||
            item.foodId ||
            item.itemId ||
            (item._id?.$oid) ||
            null;

          if (!id) return state;

          const exists = state.cart.find((i) => String(i.id) === String(id));

          if (exists) {
            return {
              cart: state.cart.map((i) =>
                String(i.id) === String(id)
                  ? { ...i, qty: i.qty + 1 }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, { ...item, id, qty: 1 }] };
        }),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            String(i.id) === String(id)
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((i) =>
              String(i.id) === String(id)
                ? { ...i, qty: i.qty - 1 }
                : i
            )
            .filter((i) => i.qty > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => String(i.id) !== String(id)),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
