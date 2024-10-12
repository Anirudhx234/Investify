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

export interface VerifyArgs {
  searchParams: string;
}

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
}
