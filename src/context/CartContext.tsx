import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  service: string;   // 'Discord Bot' | 'Minecraft' | 'VPS' | 'Lavalink'
  priceUSD: number;
  specs: { label: string; value: string }[];
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalUSD: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === newItem.id);
      if (exists) return prev; // already in cart
      return [...prev, { ...newItem, qty: 1 }];
    });
  };

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const clearCart = () => setItems([]);

  const totalUSD = items.reduce((s, i) => s + i.priceUSD * i.qty, 0);
  const count    = items.length;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalUSD, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
