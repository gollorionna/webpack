export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images?: string[];
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  tags: string[];
  rating: number;
}

export interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuth: boolean;
}

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  total: number;
}

export interface ICart {
  id: number;
  products: ICartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ICartStore {
  entity: ICart | null;
  isLoading: boolean;
  error: string | null;
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
