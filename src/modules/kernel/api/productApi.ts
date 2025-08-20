import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { product, CreateproductDto } from "../model/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getproducts: builder.query({
      query: (filters = {}) => ({
        url: "/admin/product/product/",
        method: "get",
        params: filters,
      }),
      providesTags: ["product"],
    }),
    getproductsDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/product/product/${id}/`,
        method: "get",
      }),
    }),
    postproducts: builder.mutation<product, Partial<CreateproductDto>>({
      query: (body) => ({
        url: "/admin/product/product/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["product"],
    }),
    patchproducts: builder.mutation<product, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/product/product/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteproducts: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/product/product/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetproductsQuery,
  useGetproductsDetailsQuery,
  usePostproductsMutation,
  usePatchproductsMutation,
  useDeleteproductsMutation,
} = productApi;
