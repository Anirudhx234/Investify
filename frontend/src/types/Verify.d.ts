/* request / response types for verify routes */
declare namespace Verify {
  interface Args {
    url: string;
    method: "GET" | "PATCH";
    searchParams?: string | object | undefined;
  }

  interface Response {
    message: string;
  }
}

export default Verify;
