import type { AxiosRequestConfig } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError } from 'axios'
import http from './httpService' // از http استفاده می‌کنیم چون حالا request دارد

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string
      method: Method
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
    async ({ url, method, data, params }) => {
      try {
        const result = await http.request({
          url,
          method,
          data,
          params,
        })

        return { data: result.data }
      } catch (axiosError) {
        const err = axiosError as AxiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }
