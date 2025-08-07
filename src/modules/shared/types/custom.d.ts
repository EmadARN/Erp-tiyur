
declare module '*.css' {
    const content: { [className: string]: string }
    export default content
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // می‌تونی سایر env ها رو هم اینجا اضافه کنی مثل:
    // readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
