/* types for the baseQuery */

import type {
  BaseQueryFn,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

export interface Args {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: object;
  search?: Record<string, unknown>;
}

/* result sent by the server */
export type Result = object;

/* possible errors while sending a request */
export interface Error {
  status:
    | number
    | "FETCH_ERROR"
    | "PARSING_ERROR"
    | "TIMEOUT_ERROR"
    | "CUSTOM_ERROR";
  message: string;
}

/* no extra options required as of now */
export type DefinitionExtraOptions = object;

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
