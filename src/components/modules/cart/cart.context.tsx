import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TItems = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string[];
};

interface ICart {
  cartId: string;
  user: string;
  items: TItems[];
  addItem: (item: TItems) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, quantity: number) => void;
  clearCart: () => void;
  addUser: (user: string) => void;
  removeUser: () => void;
}

// Create the store with persistence
export const useCartContext = create<ICart>()(
  persist(
    set => ({
      cartId: "",
      user: "",
      items: [],

      addItem: item =>
        set(state => {
          const existingItem = state.items.find(i => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: id =>
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        })),

      updateItem: (id, quantity) =>
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })),

      clearCart: () => set({ items: [] }),

      addUser: (user: string) => set({ user }),

      removeUser: () => set({ user: "" }),
    }),
    {
      name: "cart-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// use:
// const { items, addItem, removeItem, updateItem, clearCart } = useCartContext();
