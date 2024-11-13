import type { stateTypes } from "../types";

import { useDispatch } from "react-redux";
import { addAlert, modifyAlert, removeAlert } from "../features/toastSlice";

export interface AlertInfo {
  args:
    | { type: "success"; timeout?: number | null | undefined }
    | { type: "loading" }
    | { type: "error"; timeout?: number | null | undefined };
  caption?: string | undefined;
}

export default function useToast() {
  const dispatch = useDispatch();

  const deleteAlert = (id: number) => {
    dispatch(removeAlert(id));
  };

  const createAlert = (alertInfo: AlertInfo) => {
    const id = Date.now();

    dispatch(
      addAlert({ id, type: alertInfo.args.type, caption: alertInfo.caption }),
    );

    if (alertInfo.args.type !== "loading" && alertInfo.args.timeout !== null) {
      const timeout = alertInfo.args.timeout ?? 10000;
      setTimeout(() => deleteAlert(id), timeout);
    }

    return id;
  };

  const updateAlert = (alert: stateTypes.Alert) => {
    dispatch(modifyAlert(alert));
  };

  return { createAlert, deleteAlert, updateAlert };
}
