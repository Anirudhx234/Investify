export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  username: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  username: string;
}
