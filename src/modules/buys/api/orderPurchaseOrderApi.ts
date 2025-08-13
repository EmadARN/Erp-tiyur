import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PurchaseOrder, CreatePurchaseOrderDto, PurchaseOrdersResponse } from "../model/purchaseOrderTypes";

export const purchaseOrderApi = createApi({
  reducerPath: "purchaseOrderApi",
  baseQuery: axiosBaseQuery(http.buyApi),
  tagTypes: ["PurchaseOrder"],
  endpoints: (builder) => ({
    getPurchaseOrders: builder.query<PurchaseOrdersResponse, Record<string, any>>({
      query: (filters = {}) => ({
        url: "/order-purchase-order/",
        method: "get",
        params: filters,
      }),
      providesTags: ["PurchaseOrder"],
    }),
    getPurchaseOrderDetails: builder.query<PurchaseOrder, { id: string }>({
      query: ({ id }) => ({
        url: `/order-purchase-order/c/${id}/`,
        method: "get",
      }),
    }),
    postPurchaseOrder: builder.mutation<PurchaseOrder, Partial<CreatePurchaseOrderDto>>({
      query: (body) => ({
        url: "/order-purchase-order/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["PurchaseOrder"],
    }),
    patchPurchaseOrder: builder.mutation<PurchaseOrder, { id: string; data: Partial<PurchaseOrder> }>({
      query: ({ id, data }) => ({
        url: `/order-purchase-order/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["PurchaseOrder"],
    }),
    deleteBulkPurchaseOrder: builder.mutation<void, { data: { data: string[] } }>({
      query: ({ data }) => ({
        url: "/order-purchase-order/",
        method: "delete",
        data,
      }),
      invalidatesTags: ["PurchaseOrder"],
    }),
    deletePurchaseOrder: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/order-purchase-order/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["PurchaseOrder"],
    }),
  }),
});

export const {
  useGetPurchaseOrdersQuery,
  useGetPurchaseOrderDetailsQuery,
  usePostPurchaseOrderMutation,
  usePatchPurchaseOrderMutation,
  useDeleteBulkPurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
} = purchaseOrderApi;
