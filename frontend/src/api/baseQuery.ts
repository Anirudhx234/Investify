import {
  fetchBaseQuery,
  retry,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query";
import type CustomBaseQuery from "../types/CustomBaseQuery";

const rawBaseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8080/api" });

const baseQuery: BaseQueryFn<
  CustomBaseQuery.Args,
  CustomBaseQuery.Result,
  CustomBaseQuery.Error,
  CustomBaseQuery.DefinitionExtraOptions,
  CustomBaseQuery.Meta
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) retry.fail(result.error);

    const data = result.error.data as { message: string };

    return {
      error: {
        status: result.error.status,
        message: data.message,
      },
    };
  }

  return {
    data: result.data as object,
  };
};

const baseQueryWithRetries = retry(baseQuery, { maxRetries: 3 });
export default baseQueryWithRetries;
