const sanitizeUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

type ProcessEnvLike = Record<string, string | undefined>;

const getProcessEnvUrl = (): string | undefined => {
  let envSource: ProcessEnvLike | undefined;

  if (typeof process !== "undefined" && typeof process.env === "object") {
    envSource = process.env as ProcessEnvLike;
  } else if (typeof globalThis !== "undefined") {
    const globalProcess = (globalThis as typeof globalThis & {
      process?: { env?: ProcessEnvLike };
    }).process;

    envSource = globalProcess?.env;
  }

  return sanitizeUrl(envSource?.VITE_API_URL);
};

declare const __VITE_API_URL__: string | undefined;

const getViteDefineUrl = (): string | undefined => {
  return typeof __VITE_API_URL__ === "string" ? sanitizeUrl(__VITE_API_URL__) : undefined;
};

export const API_BASE_URL: string = getProcessEnvUrl() ?? getViteDefineUrl() ?? "";