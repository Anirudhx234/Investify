/* to handle isLoading, isFetching, isError, error, isSuccess */

import type { SerializedError } from "@reduxjs/toolkit";
import type { baseQueryTypes } from "../types";

import { useEffect, useMemo, useRef } from "react";
import { useToast } from "./useToast";
import { RequestResult } from "../components/RequestResult";

export interface RequestArgs {
  data?: unknown | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: baseQueryTypes.Error | SerializedError | undefined;
  isSuccess: boolean;
}

export interface RequestsOptions {
  onSuccess?: (() => unknown) | undefined;
  backupSuccessMessage?: string | undefined;
  backupErrorMessage?: string | undefined;
}

/*
 * 1 or more error => error
 * no errors and 1 or more loading => loading
 * no loading and all success => success
 * anything else => waiting (no alert)
 *
 * Only display success/error if was already loading before
 */
export function useToastForRequests(
  requests: { label: string; state: RequestArgs }[],
  options?: RequestsOptions | undefined,
) {
  const toast = useToast();
  const prevAlertRef = useRef<"loading" | "success" | "error" | null>(null);

  const { status, message, index } = useMemo(() => {
    let status: "loading" | "success" | "error" = "success";
    let message: string | null = null;
    let index: number | null = null;

    for (let i = 0; i < requests.length; i++) {
      const { state } = requests[i];

      if (state.isError) {
        status = "error";
        message = state.error?.message ?? null;
        index = i;
        break;
      }

      if (state.isLoading) {
        status = "loading";
        index = i;
      }

      if (!message) {
        message =
          (state.data as { message?: string | undefined })?.message ?? null;
      }
    }

    return { status, message, index };
  }, [requests]);

  const wasLoading = prevAlertRef.current === "loading";
  let label: string | null = null;
  let caption: string | null = null;

  if (index !== null) {
    label = requests[index].label;
  }

  if (status === "error" && wasLoading) {
    caption =
      `${label!}: ` +
      (message ??
        options?.backupErrorMessage ??
        "Something went wrong. Please try again later.");
  }

  if (status === "loading") {
    caption = `${label!}: ` + (message ?? "Loading...");
  }

  if (status === "success" && wasLoading) {
    caption =
      message ?? options?.backupSuccessMessage ?? "Request successful!";
  }

  useEffect(() => {
    let id: string | null = null;

    if (status === "error" && wasLoading) {
      toast.createErrorAlert({ caption: caption! });
      prevAlertRef.current = "error";
    }

    if (status === "loading") {
      id = toast.createLoadingAlert({ timeout: null, caption: caption! });
      prevAlertRef.current = "loading";
    }

    if (status === "success" && wasLoading) {
      toast.createSuccessAlert({ caption: caption! });
      prevAlertRef.current = "success";
      if (options?.onSuccess) options.onSuccess();
    }

    return () => {
      if (id) toast.deleteAlert(id);
    };
  }, [toast, status, wasLoading, caption, options]);

  return {
    component: <RequestResult status={status} caption={caption} />,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}

export function useToastForRequest(
  label: string,
  state: RequestArgs,
  options?: RequestsOptions | undefined,
) {
  const requests = useMemo(
    () => [
      {
        label,
        state,
      },
    ],
    [label, state],
  );

  return useToastForRequests(requests, options);
}
