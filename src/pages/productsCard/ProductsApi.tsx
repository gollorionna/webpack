import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://dummyjson.com";

export const api = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({ // CHANGE ANY 
      query: () => "/products",
    }),
    getProductById: builder.query<any, string | number>({ // CHANGE ANY 0
      query: (id) => `/products/${id}`,
    }),
    addProduct: builder.mutation<any, void>({ // CHANGE ANY TOO
      query: (data) => ({
        method: 'POST',
        url: "/AddProduct",
        body: data
      }) 
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = api;
