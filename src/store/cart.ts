import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ICartStore } from '@/store/types';
import type { RootState } from './store';


const initialState: ICartStore = {
  entity: null,
  isLoading: false,
  error: null,
};

type AddToCartPayload = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  thumbnail: string;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    cartReceived: (state, action) => {
      state.entity = action.payload;
      state.isLoading = false;
    },

    cartFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearCart: (state) => {
      if (state.entity) state.entity.products = [];
    },

    removeFromCart: (state, actions: PayloadAction<number>) => {
      if(!state.entity) return;
      if (state.entity) {
        const productId = actions.payload;
        const product = state.entity.products.find((prod) => prod.id === productId);
        if(!product) return;

        if (product) {
          state.entity.products = state.entity.products.filter((prod) => prod.id !== productId);
          state.entity.total -= product.total;

          state.entity.totalProducts -= 1;
          state.entity.totalQuantity -= product.quantity;

          if (!state.entity.products.length) {
            state.entity.total = 0;
            state.entity.discountedTotal = 0;
          }
        }
      }
    },
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { id, title, price, quantity = 1, thumbnail } = action.payload;

      if (!state.entity) {
        state.entity = {
          id: 1,
          products: [],
          total: 0,
          discountedTotal: 0,
          userId: 1,
          totalProducts: 0,
          totalQuantity: 0,
        };
      }

      const existingProduct = state.entity.products.find((prod) => prod.id === id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.total = existingProduct.price * existingProduct.quantity;
      } else {
        const total = price * quantity;
        state.entity.products.push({
          id,
          title,
          price,
          quantity,
          total,
          thumbnail,
        });
        state.entity.totalProducts += 1;
      }

      state.entity.total += price * quantity;
      state.entity.totalQuantity += quantity;
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;
export const { cartRequested, cartReceived, cartFailed, clearCart, removeFromCart, addToCart } =
  actions;

export const getCart = (state: RootState) => state.cart.entity;
export const getCartLoading = (state: RootState) => state.cart.isLoading;

export default cartReducer;
