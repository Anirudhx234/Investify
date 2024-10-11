import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

declare namespace CustomBaseQuery {
  interface Args {
    url: string;
    method: string;
    body?: unknown;
    queryParams?: Record<string, unknown>;
  }

  type Result = object;

  interface Error {
    status:
      | number
      | "FETCH_ERROR"
      | "PARSING_ERROR"
      | "TIMEOUT_ERROR"
      | "CUSTOM_ERROR";
    message: string;
  }

  type DefinitionExtraOptions = { base?: boolean | undefined };
  type Meta = FetchBaseQueryMeta;
}

export default CustomBaseQuery;
