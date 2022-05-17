/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SCHEMA_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
