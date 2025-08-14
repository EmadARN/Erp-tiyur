import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Inventory, CreateInventoryDto, InventoryResponse } from "../model/inventoryTypes";

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: axiosBaseQuery(http.wareHouseApi), // Assuming a similar http service setup; adjust if needed
  tagTypes: ["Inventory"], // Tag for cache management
  endpoints: (builder) => ({
    getInventories: builder.query<InventoryResponse, Record<string, any>>({
      query: (filters = {}) => ({
        url: "/inventory/",
        method: "get",
        params: filters, // Support for filter and search parameters
      }),
      providesTags: ["Inventory"], // This query provides the Inventory tag
    }),
    getInventoryDetails: builder.query<Inventory, { id: string }>({
      query: ({ id }) => ({
        url: `/inventory/c/${id}/`,
        method: "get",
      }),
    }),
    postInventory: builder.mutation<Inventory, Partial<CreateInventoryDto>>({
      query: (body) => ({
        url: "/inventory/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["Inventory"], // Invalidates the Inventory tag after POST
    }),
    patchInventory: builder.mutation<Inventory, { id: string; data: Partial<Inventory> }>({
      query: ({ id, data }) => ({
        url: `/inventory/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["Inventory"], // Invalidates the Inventory tag after PATCH
    }),
    deleteBulkInventory: builder.mutation<void, { data: { data: string[] } }>({
      query: ({ data }) => ({
        url: '/inventory/',
        method: "delete",
        data,
      }),
      invalidatesTags: ["Inventory"], // Invalidates the Inventory tag after DELETE
    }),
    deleteInventory: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/inventory/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["Inventory"], // Invalidates the Inventory tag after DELETE
    }),
  }),
});

export const {
  useGetInventoriesQuery,
  useGetInventoryDetailsQuery,
  usePostInventoryMutation,
  usePatchInventoryMutation,
  useDeleteBulkInventoryMutation,
  useDeleteInventoryMutation,
} = inventoryApi;