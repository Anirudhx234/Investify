import type AppClient from "./AppClient";

/* request / response types for verify routes */
declare namespace Verify {
  interface Args {
    url: string;
    method: "GET" | "PATCH";
    searchParams?: string | undefined;
  }

  interface Response extends AppClient {
    message?: string | undefined;
  }
}

export default Verify;
