declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KERNEL_URL: string;
  readonly VITE_API_SALE_URL: string;
  // سایر متغیرهای env خودتو اینجا اضافه کن
  // اگر میخوای اجازه بدی متغیرهای دیگه هم باشه:
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
