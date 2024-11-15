/* to handle isLoading, isFetching, isError, error, isSuccess */
import type { SerializedError } from "@reduxjs/toolkit";
import type { baseQueryTypes } from "../types";

import { useEffect, useMemo, useRef } from "react";
import { useToast } from "./useToast";

export interface RequestState {
  data?: unknown | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: baseQueryTypes.Error | SerializedError | undefined;
  isSuccess: boolean;
}

export interface UseRequestAttributes {
  requestLabel: string;
  requestState: RequestState;
  onSuccess?: (() => void) | undefined;
  successMessage?: string | undefined;
}

export function useRequest({
  requestLabel,
  requestState,
  onSuccess,
  successMessage,
}: UseRequestAttributes) {
  const requestStates = useMemo(
    () => ({
      [requestLabel]: requestState,
    }),
    [requestLabel, requestState],
  );

  return useRequests({ requestStates, onSuccess, successMessage });
}

export interface UseRequestsAttributes {
  requestStates: Record<string, RequestState>;
  onSuccess?: (() => void) | undefined;
  successMessage?: string | undefined;
}

export function useRequests({
  requestStates,
  onSuccess,
  successMessage,
}: UseRequestsAttributes) {
  const toast = useToast();
  const lastAlertRef = useRef<"success" | "loading" | "error" | undefined>();

  const { isLoading, error, serverMessage } = useMemo(() => {
    let isLoading: string | undefined;
    let error: string | undefined;
    let serverMessage: string | undefined;

    Object.entries(requestStates).forEach(([request, state]) => {
      if (state.isLoading && !isLoading) isLoading = `${request}: Loading...`;

      const errorMssg = state.error?.message || "An error occurred";
      if (state.isError && !error) error = `${request}: ${errorMssg}`;

      if (!serverMessage)
        serverMessage = (
          state.data as undefined | { message?: string | undefined }
        )?.message;
    });

    return { isLoading, error, serverMessage };
  }, [requestStates]);

  useEffect(() => {
    let id: string | null = null;
    const wasLoading = lastAlertRef.current === "loading";

    if (isLoading) {
      lastAlertRef.current = "loading";

      id = toast.createLoadingAlert({
        caption: isLoading ? isLoading : "Loading...",
      });
    }

    if (!isLoading && wasLoading && error) {
      lastAlertRef.current = "error";
      toast.createErrorAlert({ caption: error });
    }

    if (!isLoading && !error && wasLoading) {
      lastAlertRef.current = "success";

      toast.createSuccessAlert({
        caption: serverMessage ?? successMessage ?? "Request Successful",
      });

      if (onSuccess) onSuccess();
    }

    return () => {
      if (id) toast.deleteAlert(id);
    };
  }, [toast, isLoading, error, serverMessage, onSuccess, successMessage]);

  const wasLoading = lastAlertRef.current === "loading";
  const message =
    isLoading ||
    error ||
    serverMessage ||
    (!wasLoading && "Waiting...") ||
    successMessage ||
    "Request successful";

  return { isLoading: !!isLoading, isError: !!error, message };
}
