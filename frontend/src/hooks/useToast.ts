import type { stateTypes } from "../types";

import { useDispatch } from "react-redux";
import { addAlert, modifyAlert, removeAlert } from "../features/toastSlice";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useMemo } from "react";

export interface AlertInfo {
  args:
    | { type: "success"; timeout?: number | null | undefined }
    | { type: "loading" }
    | { type: "error"; timeout?: number | null | undefined };
  caption?: string | undefined;
}

export function useToast() {
  const dispatch = useDispatch();

  const deleteAlert = useCallback(
    (id: string) => {
      dispatch(removeAlert(id));
    },
    [dispatch],
  );

  const createAlert = useCallback(
    (alertInfo: AlertInfo) => {
      const id = uuidv4();

      dispatch(
        addAlert({ id, type: alertInfo.args.type, caption: alertInfo.caption }),
      );

      if (
        alertInfo.args.type !== "loading" &&
        alertInfo.args.timeout !== null
      ) {
        const timeout = alertInfo.args.timeout ?? 10000;
        setTimeout(() => deleteAlert(id), timeout);
      }

      return id;
    },
    [deleteAlert, dispatch],
  );

  const updateAlert = useCallback(
    (alert: stateTypes.Alert) => {
      dispatch(modifyAlert(alert));
    },
    [dispatch],
  );

  const createSuccessAlert = useCallback(
    ({
      timeout,
      caption,
    }: {
      timeout?: number | null | undefined;
      caption: string;
    }) => {
      return createAlert({ args: { type: "success", timeout }, caption });
    },
    [createAlert],
  );

  const createLoadingAlert = useCallback(
    ({ caption }: { caption: string }) => {
      return createAlert({ args: { type: "loading" }, caption });
    },
    [createAlert],
  );

  const createErrorAlert = useCallback(
    ({
      timeout,
      caption,
    }: {
      timeout?: number | null | undefined;
      caption: string;
    }) => {
      return createAlert({ args: { type: "error", timeout }, caption });
    },
    [createAlert],
  );

  const toast = useMemo(
    () => ({
      createAlert,
      deleteAlert,
      updateAlert,
      createSuccessAlert,
      createLoadingAlert,
      createErrorAlert,
    }),
    [
      createAlert,
      deleteAlert,
      updateAlert,
      createSuccessAlert,
      createLoadingAlert,
      createErrorAlert,
    ],
  );

  return toast;
}
