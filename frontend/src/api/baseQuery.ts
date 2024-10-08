import {
  fetchBaseQuery,
  retry,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query";
import type CustomBaseQuery from "../types/CustomBaseQuery";
import buildUrl from "../utils/buildUrl";
import { resetProfileData } from "../features/profileSlice";

const rawBaseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8080/api" });

const baseQuery: BaseQueryFn<
  CustomBaseQuery.Args,
  CustomBaseQuery.Result,
  CustomBaseQuery.Error,
  CustomBaseQuery.DefinitionExtraOptions,
  CustomBaseQuery.Meta
> = async (args, api, extraOptions) => {
  const { url, queryParams, ...remainingArgs } = args;
  const fullUrl = buildUrl(url, queryParams);

  const result = await rawBaseQuery(
    { url: fullUrl, ...remainingArgs },
    api,
    extraOptions,
  );

  if (result.error) {
    if (result.error.status === 401) {
      alert("You have been logged out");
      api.dispatch(resetProfileData());
      retry.fail(result.error);
    }

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
