import type { baseQueryTypes } from "../types";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { buildUrl } from "../util/buildUrl";
import { host } from "./server";

/* basic fetch wrapper */
export const rawBaseQuery = fetchBaseQuery({
  baseUrl: `http://${host}/api`,
  credentials: "include",
});

/* custom base query for api */
export const baseQuery: baseQueryTypes.CustomBaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const { url, search, ...remainingArgs } = args;
  const fullUrl = buildUrl(url, search);

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
