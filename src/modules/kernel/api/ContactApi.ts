import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Contact, CreateContactDto } from "../model/contact";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (filters = {}) => ({
        url: "/admin/accounts/contact/",
        method: "get",
        params: filters,
      }),
      providesTags: ["contact"],
    }),
    getContactsDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/accounts/contact/${id}/`,
        method: "get",
      }),
    }),
    postContacts: builder.mutation<Contact, Partial<CreateContactDto>>({
      query: (body) => ({
        url: "/admin/accounts/contact/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["contact"],
    }),
    patchContacts: builder.mutation<Contact, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/accounts/contact/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["contact"],
    }),
    // deleteBulkBankAccount: builder.mutation<void, { data: { data: string[] } }>({
    //     query: ({ data }) => ({
    //         url: "/order-bank-account/",
    //         method: "delete",
    //         data,
    //     }),
    //     invalidatesTags: ["contact"],
    // }),
    deleteContacts: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/accounts/contact/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactsDetailsQuery,
  usePostContactsMutation,
  usePatchContactsMutation,
  useDeleteContactsMutation,
} = contactApi;
