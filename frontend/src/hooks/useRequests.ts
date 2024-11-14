/* to handle isLoading, isFetching, isError, error, isSuccess */
import type { SerializedError } from "@reduxjs/toolkit";
import type { baseQueryTypes } from "../types";

import { useEffect, useMemo } from "react";
import useToast from "./useToast";

export interface UseRequestsAttributes {
  requests: Record<
    string,
    {
      isLoading: boolean;
      isFetching?: boolean | undefined;
      isError: boolean;
      error: baseQueryTypes.Error | SerializedError | undefined;
      isSuccess: boolean;
    }
  >;

  successMssg?: string | undefined;
}

export default function useRequests({
  requests,
  successMssg,
}: UseRequestsAttributes) {
  const toast = useToast();

  const { isLoading, error, isSuccess } = useMemo(() => {
    let isLoading: string | undefined;
    let error: string | undefined;
    let isSuccess: boolean = true;

    Object.entries(requests).forEach(([request, state]) => {
      if (state.isLoading || state.isFetching) {
        if (!isLoading) isLoading = `${request}: Loading...`;
      }

      const errorMssg = state.error?.message || "An error occurred";
      if (state.isError && !error) error = `${request}: ${errorMssg}`;

      if (!state.isSuccess) isSuccess = false;
    });

    return { isLoading, error, isSuccess };
  }, [requests]);

  useEffect(() => {
    let id: string | null = null;

    if (isSuccess) {
      id = toast.createSuccessAlert({
        caption: successMssg ?? "Request Successful",
      });
    } else if (error) {
      id = toast.createErrorAlert({ caption: error });
    } else {
      id = toast.createLoadingAlert({
        caption: isLoading ? isLoading : "Loading...",
      });
    }

    return () => {
      if (id) toast.deleteAlert(id);
    };
  }, [toast, isLoading, error, isSuccess, successMssg]);

  return { isLoading, error, isSuccess };
}
