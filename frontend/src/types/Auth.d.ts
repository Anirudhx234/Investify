import AppClient from "./AppClient";

/* request / response types for auth */
declare namespace Auth {
  export interface SignUpRequest {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  export type SignUpResponse = AppClient;

  export interface LoginRequest {
    email: string;
    password: string;
  }

  export type LoginResponse = AppClient;

  export interface ResetPasswordRequest {
    password: string;
    confirmPassword: string;
  }
}

export default Auth;
