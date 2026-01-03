// context/BasketContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export interface IBasketItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface BasketContextType {
  items: IBasketItem[];
  addItem: (product: Omit<IBasketItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearBasket: () => void;
  totalItems: number;
  totalPrice: number;
  isEmpty: boolean;
}

const BasketContext = createContext<BasketContextType | null>(null);

const BASKET_KEY = "basket";

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<IBasketItem[]>(() => {
    // Инициализация из localStorage сразу
    const saved = localStorage.getItem(BASKET_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(BASKET_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Omit<IBasketItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(id);
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    },
    [removeItem]
  );

  const clearBasket = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        totalItems,
        totalPrice,
        isEmpty: items.length === 0,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

// Хук для использования контекста
export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within BasketProvider");
  }
  return context;
}
