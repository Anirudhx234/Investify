import type { BaseQueryFn, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

/* types for args, result, meta, etc for api base query */
declare namespace CustomBaseQuery {
  /* args for sending a request */
  interface Args {
    url: string;
    method: string;
    body?: unknown;
    queryParams?: Record<string, unknown>;
  }

  /* result sent by the server */
  type Result = object;

  /* possible errors while sending a request */
  interface Error {
    status:
      | number
      | "FETCH_ERROR"
      | "PARSING_ERROR"
      | "TIMEOUT_ERROR"
      | "CUSTOM_ERROR";
    message: string;
  }

  /* no extra options required as of now */
  type DefinitionExtraOptions = Record<string, never>;

  /* meta info about the request */
  type Meta = FetchBaseQueryMeta;

  /* base query function type */
  type CustomBaseQueryFn = BaseQueryFn<
    Args,
    Result,
    Error,
    DefinitionExtraOptions,
    Meta
  >;
}

export default CustomBaseQuery;
