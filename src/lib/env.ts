const sanitizeUrl = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const getProcessEnvUrl = (): string | undefined => {
  if (typeof process !== "undefined" && (process as any)?.env) {
    return sanitizeUrl((process as any).env.VITE_API_URL);
  }
  return undefined;
};

const getViteEnvUrl = (): string | undefined => {
  try {
    const env: any = (0, eval)("import.meta.env");
    return sanitizeUrl(env?.VITE_API_URL);
  } catch {
    // ignore to allow fallback to other strategies
  }
  return undefined;
};

export const API_BASE_URL: string =
  getProcessEnvUrl() ?? getViteEnvUrl() ?? "";
