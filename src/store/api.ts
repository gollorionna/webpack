import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICart } from '@/store/types';
import { IProductResponse, IProduct } from '@/store/types';


const URL = 'https://dummyjson.com';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products', 'Auth'],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string | void>({
      query: () => `/products`,
      transformResponse: (response: IProductResponse) => response.products,
      providesTags: ['Products'],
      keepUnusedDataFor: 600,
    }),

    getProductsByCategory: builder.query<IProduct[], string | void>({
      query: (category) => (category ? `products/category/${category}` : 'products'),
      transformResponse: (response: IProductResponse) => response.products,
      providesTags: ['Products'],
      keepUnusedDataFor: 600,
    }),

    getProductById: builder.query<IProduct, number>({
      query: (id) => `/products/${id}`,
    }),

    orderSubmit: builder.mutation<void, ICart>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
    }),
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => '/auth/me',
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useOrderSubmitMutation,
  useGetProductByIdQuery,
} = api;
