export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profileName: string;
  avatar: string;
  bio: string;
  roleName: string;
  status: string;
  noFollowers: number;
  noFollowing: number;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
