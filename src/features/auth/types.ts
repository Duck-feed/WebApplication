export interface User {
  id: string;
  username?: string;
  roleId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  bio?: string;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
