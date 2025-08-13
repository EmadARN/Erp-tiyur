import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { LoadedProduct, CreateLoadedProductDto, LoadedProductsResponse } from "../model/loadedProductTypes";

export const loadedProductApi = createApi({
  reducerPath: "loadedProductApi",
  baseQuery: axiosBaseQuery(http.buyApi),
  tagTypes: ["LoadedProduct"],
  endpoints: (builder) => ({
    getLoadedProducts: builder.query<LoadedProductsResponse, Record<string, any>>({
      query: (filters = {}) => ({
        url: "/loaded-product/",
        method: "get",
        params: filters,
      }),
      providesTags: ["LoadedProduct"],
    }),
    getLoadedProductDetails: builder.query<LoadedProduct, { id: string }>({
      query: ({ id }) => ({
        url: `/loaded-product/c/${id}/`,
        method: "get",
      }),
    }),
    postLoadedProduct: builder.mutation<LoadedProduct, Partial<CreateLoadedProductDto>>({
      query: (body) => ({
        url: "/loaded-product/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["LoadedProduct"],
    }),
    patchLoadedProduct: builder.mutation<LoadedProduct, { id: string; data: Partial<LoadedProduct> }>({
      query: ({ id, data }) => ({
        url: `/loaded-product/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["LoadedProduct"],
    }),
    deleteBulkLoadedProduct: builder.mutation<void, { data: { data: string[] } }>({
      query: ({ data }) => ({
        url: "/loaded-product/",
        method: "delete",
        data,
      }),
      invalidatesTags: ["LoadedProduct"],
    }),
    deleteLoadedProduct: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/loaded-product/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["LoadedProduct"],
    }),
  }),
});

export const {
  useGetLoadedProductsQuery,
  useGetLoadedProductDetailsQuery,
  usePostLoadedProductMutation,
  usePatchLoadedProductMutation,
  useDeleteBulkLoadedProductMutation,
  useDeleteLoadedProductMutation,
} = loadedProductApi;
