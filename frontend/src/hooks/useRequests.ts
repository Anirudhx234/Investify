/* to handle isLoading, isFetching, isError, error, isSuccess */
import type { SerializedError } from "@reduxjs/toolkit";
import type { baseQueryTypes } from "../types";

import { useEffect, useMemo, useState } from "react";
import useToast from "./useToast";

export type UseRequestsAttributes = Record<
  string,
  {
    isLoading: boolean;
    isFetching?: boolean | undefined;
    isError: boolean;
    error: baseQueryTypes.Error | SerializedError | undefined;
    isSuccess: boolean;
  }
>;

export default function useRequests(requests: UseRequestsAttributes) {
  const toast = useToast();
  const [alertId, setAlertId] = useState<string | null>(null);

  useEffect(() => {
    const id = toast.createLoadingAlert({ caption: "Loading..." });
    setAlertId(id);
    return () => {
      toast.deleteAlert(id);
      setAlertId(null);
    };
  }, [toast]);

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
    if (alertId) {
      let type: "success" | "error" | "loading";
      let caption: string;

      if (isSuccess) {
        type = "success";
        caption = "Request Successful";
      } else if (error) {
        type = "error";
        caption = error;
      } else {
        type = "loading";
        if (isLoading) caption = isLoading;
        else caption = "Loading...";
      }

      toast.updateAlert({ id: alertId, type, caption });
    }
  }, [toast, alertId, isLoading, error, isSuccess]);

  return { isLoading, error, isSuccess };
}
