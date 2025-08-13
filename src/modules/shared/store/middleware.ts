import { salesApi } from '@/modules/sales/api/salesApi'
import type { Middleware } from '@reduxjs/toolkit'
import { LoginApi } from '@/modules/auth/api/Login'
import { buyProductApi } from '@/modules/buys/api/buyProductApi'
import { shareApi } from '../api/shareApi'
import {bankAccountApi} from "@/modules/buys/api/bankAccountApi.ts";
export const middlewares: Middleware[] = [
    salesApi.middleware,
    LoginApi.middleware,
    buyProductApi.middleware,
    shareApi.middleware,
    bankAccountApi.middleware

    // inventoryApi.middleware,  // اگر API دیگه‌ای اضافه کردی
]
