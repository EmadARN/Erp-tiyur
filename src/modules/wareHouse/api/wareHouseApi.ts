import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  Inventory,
  CreateInventoryDto,

} from "../model/inventoryTypes";
import type { OrdersResponse } from "../model/wareHouseType";

export const wareHouseApi = createApi({
  reducerPath: "wareHouseApi",
  baseQuery: axiosBaseQuery(http.wareHouseApi),
  tagTypes: ["wareHouse"], // Tag for cache management
  endpoints: (builder) => ({
    getBuyProduct: builder.query<OrdersResponse, Record<string, any>>({
      query: (filters = {}) => ({
        url: "/buy-product/",
        method: "get",
        params: filters, // Support for filter and search parameters
      }),
      providesTags: ["wareHouse"], // This query provides the BuyProduct tag
    }),
    getBuyProductDetails: builder.query<Inventory, { id: string }>({
      query: ({ id }) => ({
        url: `/buy-product/c/${id}/`,
        method: "get",
      }),
    }),
    postBuyProduct: builder.mutation<Inventory, Partial<CreateInventoryDto>>({
      query: (body) => ({
        url: "/buy-product/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["wareHouse"], // Invalidates the BuyProduct tag after POST
    }),
    patchBuyProduct: builder.mutation<
      Inventory,
      { id: string; data: Partial<Inventory> }
    >({
      query: ({ id, data }) => ({
        url: `/buy-product/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["wareHouse"], // Invalidates the BuyProduct tag after PATCH
    }),
    deleteBulkBuyProduct: builder.mutation<void, { data: { data: string[] } }>({
      query: ({ data }) => ({
        url: "/buy-product/",
        method: "delete",
        data,
      }),
      invalidatesTags: ["wareHouse"], // Invalidates the BuyProduct tag after DELETE
    }),
    deleteBuyProduct: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/buy-product/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["wareHouse"], // Invalidates the BuyProduct tag after DELETE
    }),
  }),
});

export const {
  useGetBuyProductQuery,
  useGetBuyProductDetailsQuery,
  usePostBuyProductMutation,
  usePatchBuyProductMutation,
  useDeleteBulkBuyProductMutation,
  useDeleteBuyProductMutation,
} = wareHouseApi;
