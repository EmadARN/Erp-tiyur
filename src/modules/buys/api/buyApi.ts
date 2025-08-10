import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const buysApi = createApi({
  reducerPath: "buysApi",
  baseQuery: axiosBaseQuery(http.buyApi),
  endpoints: (builder) => ({
    getBuys: builder.query<any, void>({
      query: () => ({
        url: "/buy-product/",
        method: "get",
      }),
    }),
  }),
});

export const { useGetBuysQuery } = buysApi;
