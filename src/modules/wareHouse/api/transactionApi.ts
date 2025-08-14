import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Transaction, CreateTransactionDto, TransactionResponse } from "../model/transactionTypes";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: axiosBaseQuery(http.wareHouseApi),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionResponse, Record<string, any>>({
      query: (filters = {}) => ({
        url: "/transaction/",
        method: "get",
        params: filters,
      }),
      providesTags: ["Transaction"],
    }),
    getTransactionDetails: builder.query<Transaction, { id: string }>({
      query: ({ id }) => ({
        url: `/transaction/c/${id}/`,
        method: "get",
      }),
    }),
    postTransaction: builder.mutation<Transaction, Partial<CreateTransactionDto>>({
      query: (body) => ({
        url: "/transaction/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["Transaction"],
    }),
    patchTransaction: builder.mutation<Transaction, { id: string; data: Partial<Transaction> }>({
      query: ({ id, data }) => ({
        url: `/transaction/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteBulkTransaction: builder.mutation<void, { data: { data: string[] } }>({
      query: ({ data }) => ({
        url: "/transaction/",
        method: "delete",
        data,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/transaction/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionDetailsQuery,
  usePostTransactionMutation,
  usePatchTransactionMutation,
  useDeleteBulkTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;