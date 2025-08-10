import { salesApi } from '@/modules/sales/api/salesApi'
import type { Middleware } from '@reduxjs/toolkit'
import { LoginApi } from '@/modules/auth/api/Login' 
import { buysApi } from '@/modules/buys/api/buyApi'
export const middlewares: Middleware[] = [
    salesApi.middleware,
    LoginApi.middleware,
    buysApi.middleware
    // inventoryApi.middleware,  // اگر API دیگه‌ای اضافه کردی
]
