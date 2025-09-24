import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize error object to a readable string message
 */
export function normalizeError(error: unknown): string {
  const err = error as { response?: { data?: any } } | undefined;
  const data = err?.response?.data;

  if (!data) return "Network error, Please try again";

  if (data.errors) {
    if (typeof data.errors === "string") return data.errors;

    if (typeof data.errors === "object") {
      const messages = Object.values(data.errors).flat();
      return (messages as string[]).join(", ");
    }
  }

  if (typeof data.message === "string") return data.message;

  return "Something went wrong, Please try again";
}

/**
 * Serialize params object to query string
 */
type ParamPrimitive = string | number | boolean;
type ParamValue = ParamPrimitive | ParamPrimitive[];

export const paramsSerializer = (params: Record<string, ParamValue>) => {
  const queryStrings: string[] = [];

  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      });
    } else {
      queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  return queryStrings.join("&");
};
