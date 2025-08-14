import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Order, CreateOrderDto, OrdersResponse } from "../model/orderType.ts";

export const orderApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: axiosBaseQuery(http.saleApi),
    tagTypes: ["Order"],
    endpoints: (builder) => ({
        getOrders: builder.query<OrdersResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/order/",
                method: "get",
                params: filters,
            }),
            providesTags: ["Order"],
        }),
        getOrderDetails: builder.query<Order, { id: string }>({
            query: ({ id }) => ({
                url: `/order/c/${id}/`,
                method: "get",
            }),
        }),
        postOrder: builder.mutation<Order, Partial<CreateOrderDto>>({
            query: (body) => ({
                url: "/order/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["Order"],
        }),
        patchOrder: builder.mutation<Order, { id: string; data: Partial<Order> }>({
            query: ({ id, data }) => ({
                url: `/order/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["Order"],
        }),
        deleteBulkOrder: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/order/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["Order"],
        }),
        deleteOrder: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/order/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderDetailsQuery,
    usePostOrderMutation,
    usePatchOrderMutation,
    useDeleteBulkOrderMutation,
    useDeleteOrderMutation,
} = orderApi;