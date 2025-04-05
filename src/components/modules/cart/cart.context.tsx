import { create } from "zustand";

export type TItems = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string[];
};

interface ICart {
  user: string;
  items: TItems[];
  addItem: (item: TItems) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartContext = create<ICart>(set => ({
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
}));

// use:
// const { items, addItem, removeItem, updateItem, clearCart } = useCartContext();
