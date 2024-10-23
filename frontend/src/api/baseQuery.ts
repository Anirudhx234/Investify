import type CustomBaseQuery from "../types/CustomBaseQuery";

import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query";
import buildUrl from "../util/buildUrl";

/* basic fetch wrapper */
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
  timeout: 3000,
});

/* custom base query for api */
const baseQuery: CustomBaseQuery.CustomBaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const { url, queryParams, ...remainingArgs } = args;
  const fullUrl = buildUrl(url, queryParams);

  const result = await rawBaseQuery(
    { url: fullUrl, ...remainingArgs },
    api,
    extraOptions,
  );

  if (result.error) {
    const data = result.error.data as undefined | { message?: string };
    const status = result.error.status;
    let message: string;

    if (data) {
      message = data.message ?? "An error occurred";
    } else {
      if (status === "FETCH_ERROR") message = "Couldn't connect to server";
      else if (status === "TIMEOUT_ERROR") message = "Request timed out";
      else if (status === "PARSING_ERROR") message = "Improper server response";
      else message = "An error occurred";
    }

    return {
      error: { status, message },
    };
  }

  return {
    data: result.data as object,
  };
};

const baseQueryWithRetries = retry(baseQuery, { maxRetries: 3 });
export default baseQueryWithRetries;
