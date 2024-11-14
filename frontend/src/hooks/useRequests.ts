/* to handle isLoading, isFetching, isError, error, isSuccess */
import type { SerializedError } from "@reduxjs/toolkit";
import type { baseQueryTypes } from "../types";

import { useEffect, useMemo } from "react";
import useToast from "./useToast";

export interface UseRequestsAttributes {
  requests: Record<
    string,
    {
      data?: unknown | undefined;
      isLoading: boolean;
      isFetching?: boolean | undefined;
      isError: boolean;
      error?: baseQueryTypes.Error | SerializedError | undefined;
      isSuccess: boolean;
    }
  >;

  onSuccess?: (() => void) | undefined;
  successMssg?: string | undefined;
}

export default function useRequests({
  requests,
  onSuccess,
  successMssg,
}: UseRequestsAttributes) {
  const toast = useToast();

  const { isLoading, error, isSuccess, message } = useMemo(() => {
    let isLoading: string | undefined;
    let error: string | undefined;
    let isSuccess: boolean = true;
    let message: string | undefined;

    Object.entries(requests).forEach(([request, state]) => {
      if (state.isLoading || state.isFetching) {
        if (!isLoading) isLoading = `${request}: Loading...`;
      }

      const errorMssg = state.error?.message || "An error occurred";
      if (state.isError && !error) error = `${request}: ${errorMssg}`;

      if (!state.isSuccess) isSuccess = false;

      if (!message)
        message = (state.data as undefined | { message?: string | undefined })
          ?.message;
    });

    return { isLoading, error, isSuccess, message };
  }, [requests]);

  useEffect(() => {
    let id: string | null = null;

    if (isSuccess) {
      toast.createSuccessAlert({
        caption: message ?? successMssg ?? "Request Successful",
      });

      if (onSuccess !== undefined) onSuccess();
    } else if (error) {
      toast.createErrorAlert({ caption: error });
    } else if (isLoading) {
      id = toast.createLoadingAlert({
        caption: isLoading ? isLoading : "Loading...",
      });
    }

    return () => {
      if (id) toast.deleteAlert(id);
    };
  }, [toast, isLoading, error, isSuccess, message, onSuccess, successMssg]);

  return { isLoading: !!isLoading, error, isSuccess };
}
