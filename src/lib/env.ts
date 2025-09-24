const sanitizeUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const getProcessEnvUrl = (): string | undefined => {
  if (typeof process !== "undefined" && process.env) {
    return sanitizeUrl(process.env.VITE_API_URL);
  }
  return undefined;
};

export const API_BASE_URL: string =
  getProcessEnvUrl() ?? "";
