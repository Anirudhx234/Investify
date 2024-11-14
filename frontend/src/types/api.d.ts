/* types for the complicated api endpoints */

export interface VerifyClientArgs {
  url: string;
  method: "GET" | "PATCH";
  search?: string | object | undefined;
  body?: object | undefined;
}

export interface SignUpArgs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
