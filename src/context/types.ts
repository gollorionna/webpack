export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images?: string[];
}

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartContextType {
  items: ICartItem[];
  addItem: (product: Omit<ICartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isEmpty: boolean;
}

export const CART_KEY = "cart";
