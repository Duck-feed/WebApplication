// env.ts

const sanitizeUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

/**
 * Lấy biến từ process.env (chỉ hữu dụng khi chạy local dev/server)
 */
const getProcessEnvUrl = (): string | undefined => {
  if (typeof process !== "undefined" && process.env) {
    return sanitizeUrl(process.env.VITE_API_URL);
  }
  return undefined;
};

/**
 * Lấy biến từ import.meta.env (chuẩn của Vite khi build trên Vercel)
 */
const getViteEnvUrl = (): string | undefined => {
  try {
    // import.meta.env chỉ có khi chạy trong môi trường Vite
    const env = import.meta.env as Record<string, string>;
    return sanitizeUrl(env?.VITE_API_URL);
  } catch {
    return undefined;
  }
};

/**
 * API_BASE_URL: Ưu tiên lấy từ process.env → import.meta.env → fallback = ""
 */
export const API_BASE_URL: string = getProcessEnvUrl() ?? getViteEnvUrl() ?? "";
