import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: axiosBaseQuery(http.saleApi),
  endpoints: (builder) => ({
    getSales: builder.query<any, void>({
      query: () => ({
        url: "/buy-product/",
        method: "get",
      }),
    }),
  }),
});

export const { useGetSalesQuery } = salesApi;
