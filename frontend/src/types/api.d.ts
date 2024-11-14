/* types for the complicated api endpoints */

export interface VerifyClientArgs {
  url: string;
  search?: string | object | undefined;
}

export interface ResetPasswordArgs {
  password: string;
  confirmPassword: string;
  search?: string | object | undefined;
}

export interface SignUpArgs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
