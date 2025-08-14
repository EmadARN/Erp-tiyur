import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { LoadedProductItem, CreateLoadedProductItemDto, LoadedProductItemsResponse } from "../model/loadedProductItemsTypes";

export const loadedProductItemsApi = createApi({
  reducerPath: "loadedProductItemsApi",
  baseQuery: axiosBaseQuery(http.saleApi),
  tagTypes: ["LoadedProductItem"],
  endpoints: (builder) => ({
    getLoadedProductItems: builder.query<LoadedProductItemsResponse, Record<string, any>>({
      query: (filters = {}) => ({
        url: "/loaded-product-items/",
        method: "get",
        params: filters,
      }),
      providesTags: ["LoadedProductItem"],
    }),
    getLoadedProductItemDetails: builder.query<LoadedProductItem, { id: string }>({
      query: ({ id }) => ({
        url: `/loaded-product-items/c/${id}/`,
        method: "get",
      }),
    }),
    postLoadedProductItem: builder.mutation<LoadedProductItem, Partial<CreateLoadedProductItemDto>>({
      query: (body) => ({
        url: "/loaded-product-items/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["LoadedProductItem"],
    }),
    patchLoadedProductItem: builder.mutation<LoadedProductItem, { id: string; data: Partial<LoadedProductItem> }>({
      query: ({ id, data }) => ({
        url: `/loaded-product-items/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["LoadedProductItem"],
    }),
    deleteBulkLoadedProductItem: builder.mutation<void, { data: { data: string[] } }>({
      query: ({ data }) => ({
        url: "/loaded-product-items/",
        method: "delete",
        data,
      }),
      invalidatesTags: ["LoadedProductItem"],
    }),
    deleteLoadedProductItem: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/loaded-product-items/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["LoadedProductItem"],
    }),
  }),
});

export const {
  useGetLoadedProductItemsQuery,
  useGetLoadedProductItemDetailsQuery,
  usePostLoadedProductItemMutation,
  usePatchLoadedProductItemMutation,
  useDeleteBulkLoadedProductItemMutation,
  useDeleteLoadedProductItemMutation,
} = loadedProductItemsApi;