import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize error object to a readable string message
 */
export function normalizeError(error: any): string {
  const data = error?.response?.data;

  if (!data) return "Network error, please try again";

  if (data.errors) {
    if (typeof data.errors === "string") return data.errors;

    if (typeof data.errors === "object") {
      const messages = Object.values(data.errors).flat();
      return (messages as string[]).join(", ");
    }
  }

  if (data.message) return data.message;

  return "Something went wrong, please try again";
}

export const paramsSerializer = (params: Record<string, any>) => {
  const queryStrings: string[] = [];

  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
      });
    } else if (value !== undefined && value !== null) {
      queryStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return queryStrings.join("&");
};


