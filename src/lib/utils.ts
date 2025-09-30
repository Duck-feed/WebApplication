import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { User } from "@/features/auth/types";

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

export function timeAgo(dateString: string): string {
  const utcDate = new Date(dateString);

  const gmt7Date = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

  const now = new Date();
  const diff = (now.getTime() - gmt7Date.getTime()) / 1000;

  if (diff < 60) {
    return `${Math.floor(diff)} seconds ago`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)} days ago`;
  } else if (diff < 31104000) {
    return `${Math.floor(diff / 2592000)} months ago`;
  } else {
    return `${Math.floor(diff / 31104000)} years ago`;
  }
}

export function getDisplayName(user: User | null | undefined): string {
  if (!user) return "Guest";

  const byProfile = user.profileName?.trim();
  if (byProfile) return byProfile;

  const names = [user.firstName, user.lastName]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part && part.length));

  if (names.length > 0) return names.join(" ");

  return user.username || "Guest";
}
