import { Product } from '@/app/shop/[storeId]/actions/types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware"
interface cartstore {
items: Product[];
addItem: (data: Product) => void;
removeItem: (id: string) => void;
removeAll: () => void
}

export const useCart = create(
  persist<cartstore>((set, get)=>({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItems = currentItems.find((item)=> item.id === data.id);
      if(existingItems){
        return toast("Item already in cart.")
      }
      set({ items: [...get().items, data]});
      toast.success("Item added to cart.");
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item)=> item.id!== id)]});
      toast.success("Item removed");
    },
    removeAll: () => set({ items: []})

  }), {
    name: "cart-storage",
    storage: createJSONStorage(()=> localStorage)
  })
);