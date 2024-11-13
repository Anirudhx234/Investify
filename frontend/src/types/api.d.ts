/* types for the complicated api endpoints */

export interface VerifyClientArgs {
  url: string;
  method: "GET" | "PATCH";
  search?: string | object | undefined;
  body?: object | undefined;
}
