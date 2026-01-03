// hooks/useBasket.ts
import { useState, useEffect, useCallback } from "react";

export interface IBasketItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
}

const BASKET_KEY = "basket";

export function useBasket() {
    const [items, setItems] = useState<IBasketItem[]>([]);

    // Загрузка из localStorage при монтировании
    useEffect(() => {
        const saved = localStorage.getItem(BASKET_KEY);
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch {
                setItems([]);
            }
        }
    }, []);

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

    const updateQuantity = useCallback((id: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    }, [removeItem]);

    const clearBasket = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        totalItems,
        totalPrice,
        isEmpty: items.length === 0,
    };
}