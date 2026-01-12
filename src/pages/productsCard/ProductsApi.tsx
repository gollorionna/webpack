import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://dummyjson.com";

export interface Product {
  images: string[];
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const api = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "/products",
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (data) => ({
        method: "POST",
        url: "/products/add",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
} = api;
