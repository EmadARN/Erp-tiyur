import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { BankAccount, CreateBankAccountDto, BankAccountsResponse } from "../model/bankAccount";

export const bankAccountApi = createApi({
    reducerPath: "bankAccountApi",
    baseQuery: axiosBaseQuery(http.buyApi),
    tagTypes: ["BankAccount"],
    endpoints: (builder) => ({
        getBankAccounts: builder.query<BankAccountsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/order-bank-account/",
                method: "get",
                params: filters,
            }),
            providesTags: ["BankAccount"],
        }),
        getBankAccountDetails: builder.query<BankAccount, { id: string }>({
            query: ({ id }) => ({
                url: `/order-bank-account/c/${id}/`,
                method: "get",
            }),
        }),
        postBankAccount: builder.mutation<BankAccount, Partial<CreateBankAccountDto>>({
            query: (body) => ({
                url: "/order-bank-account/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["BankAccount"],
        }),
        patchBankAccount: builder.mutation<BankAccount, { id: string; data: Partial<BankAccount> }>({
            query: ({ id, data }) => ({
                url: `/order-bank-account/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["BankAccount"],
        }),
        deleteBulkBankAccount: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/order-bank-account/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["BankAccount"],
        }),
        deleteBankAccount: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/order-bank-account/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["BankAccount"],
        }),
    }),
});

export const {
    useGetBankAccountsQuery,
    useGetBankAccountDetailsQuery,
    usePostBankAccountMutation,
    usePatchBankAccountMutation,
    useDeleteBulkBankAccountMutation,
    useDeleteBankAccountMutation,
} = bankAccountApi;
