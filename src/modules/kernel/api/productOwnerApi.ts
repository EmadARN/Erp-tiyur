import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { productOwner, CreateproductOwnerDto } from "../model/productOwner";

export const productOwnerApi = createApi({
  reducerPath: "productOwnerApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["productOwner"],
  endpoints: (builder) => ({
    getproductOwners: builder.query({
      query: (filters = {}) => ({
        url: "/admin/ownership/product-owner/",
        method: "get",
        params: filters,
      }),
      providesTags: ["productOwner"],
    }),
    getproductOwnersDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/ownership/product-owner/${id}/`,
        method: "get",
      }),
    }),
    postproductOwners: builder.mutation<productOwner, Partial<CreateproductOwnerDto>>({
      query: (body) => ({
        url: "/admin/ownership/product-owner/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["productOwner"],
    }),
    patchproductOwners: builder.mutation<productOwner, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/ownership/product-owner/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["productOwner"],
    }),

    deleteproductOwners: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/ownership/product-owner/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["productOwner"],
    }),
  }),
});

export const {
  useGetproductOwnersQuery,
  useGetproductOwnersDetailsQuery,
  usePostproductOwnersMutation,
  usePatchproductOwnersMutation,
  useDeleteproductOwnersMutation,
} = productOwnerApi;
