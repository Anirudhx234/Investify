import { useDispatch } from "react-redux";
import { addAlert, removeAlert } from "../features/toastSlice";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useMemo } from "react";

export interface AlertArgs {
  type: "loading" | "success" | "error";
  caption?: string | undefined;
  timeout?: number | null | undefined;
}

export function useToast() {
  const dispatch = useDispatch();

  const deleteAlert = useCallback(
    (id: string) => dispatch(removeAlert(id)),
    [dispatch],
  );

  const createAlert = useCallback(
    (alertArgs: AlertArgs) => {
      const id = uuidv4();

      dispatch(
        addAlert({ id, type: alertArgs.type, caption: alertArgs.caption }),
      );

      const timeout = alertArgs.timeout ?? 10000;
      if (alertArgs.timeout !== null) {
        setTimeout(() => deleteAlert(id), timeout);
      }

      return id;
    },
    [deleteAlert, dispatch],
  );

  const createSuccessAlert = useCallback(
    ({ timeout, caption }: Omit<AlertArgs, "type">) => {
      return createAlert({ type: "success", timeout, caption });
    },
    [createAlert],
  );

  const createLoadingAlert = useCallback(
    ({ timeout, caption }: Omit<AlertArgs, "type">) => {
      return createAlert({ type: "loading", timeout, caption });
    },
    [createAlert],
  );

  const createErrorAlert = useCallback(
    ({ timeout, caption }: Omit<AlertArgs, "type">) => {
      return createAlert({ type: "error", timeout, caption });
    },
    [createAlert],
  );

  const toast = useMemo(
    () => ({
      createAlert,
      deleteAlert,
      createSuccessAlert,
      createLoadingAlert,
      createErrorAlert,
    }),
    [
      createAlert,
      deleteAlert,
      createSuccessAlert,
      createLoadingAlert,
      createErrorAlert,
    ],
  );

  return toast;
}
