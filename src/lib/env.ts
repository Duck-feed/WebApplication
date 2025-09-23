export const API_BASE_URL: string = (() => {
  let url = "";
  try {
    // Access Vite env lazily so TS doesn't parse import.meta
    // eslint-disable-next-line no-eval
    const im: any = eval("import.meta");
    url = im?.env?.VITE_API_URL || "";
  } catch {}
  if (!url && typeof process !== "undefined" && (process as any).env) {
    url = (process as any).env.VITE_API_URL || "";
  }
  return url;
})();
