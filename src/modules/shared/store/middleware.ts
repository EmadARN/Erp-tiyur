import { salesApi } from '@/modules/sales/api/salesApi'
import type { Middleware } from '@reduxjs/toolkit'

export const middlewares: Middleware[] = [
    salesApi.middleware,
    // inventoryApi.middleware,  // اگر API دیگه‌ای اضافه کردی
]
