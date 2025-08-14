import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { OrderItem, CreateOrderItemDto, OrderItemsResponse } from "../model/orderItemsType.ts";

export const orderItemsApi = createApi({
    reducerPath: "orderItemsApi",
    baseQuery: axiosBaseQuery(http.saleApi),
    tagTypes: ["OrderItem"],
    endpoints: (builder) => ({
        getOrderItems: builder.query<OrderItemsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/order-items/",
                method: "get",
                params: filters,
            }),
            providesTags: ["OrderItem"],
        }),
        getOrderItemDetails: builder.query<OrderItem, { id: string }>({
            query: ({ id }) => ({
                url: `/order-items/c/${id}/`,
                method: "get",
            }),
        }),
        postOrderItem: builder.mutation<OrderItem, Partial<CreateOrderItemDto>>({
            query: (body) => ({
                url: "/order-items/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["OrderItem"],
        }),
        patchOrderItem: builder.mutation<OrderItem, { id: string; data: Partial<OrderItem> }>({
            query: ({ id, data }) => ({
                url: `/order-items/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["OrderItem"],
        }),
        deleteBulkOrderItem: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/order-items/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["OrderItem"],
        }),
        deleteOrderItem: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/order-items/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["OrderItem"],
        }),
    }),
});

export const {
    useGetOrderItemsQuery,
    useGetOrderItemDetailsQuery,
    usePostOrderItemMutation,
    usePatchOrderItemMutation,
    useDeleteBulkOrderItemMutation,
    useDeleteOrderItemMutation,
} = orderItemsApi;