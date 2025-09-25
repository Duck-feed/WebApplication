export interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
}
