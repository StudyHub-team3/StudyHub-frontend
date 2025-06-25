
export interface AuthToken {
  token: string;
  expiresIn: number;
}

export interface TokenData {
  access: AuthToken;
  refresh: AuthToken;
}

export interface UserInfoData {
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data?: T;
}