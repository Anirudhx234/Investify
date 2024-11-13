import type { ReactNode } from "react";

import { createContext, useCallback, useState } from "react";
import Alert from "./Alert";

export interface SuccessArgs {
  type: "success";
  timeout?: number | null | undefined;
}

export interface LoadingArgs {
  type: "loading";
}

export interface ErrorArgs {
  type: "error";
  timeout?: number | null | undefined;
}

export interface Alert {
  id: number;
  args: SuccessArgs | LoadingArgs | ErrorArgs;
  caption: string;
}

export interface ToastContextAttributes {
  createAlert: (alertInfo: Omit<Alert, "id">) => number | null;
  removeAlert: (id: number) => number | null;
  modifyAlert: (alert: Alert) => number | null;
}

export const ToastContext = createContext<ToastContextAttributes>({
  createAlert: () => null,
  removeAlert: () => null,
  modifyAlert: () => null,
});

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback((id: number) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    return id;
  }, []);

  const createAlert = useCallback(
    (alertInfo: Omit<Alert, "id">) => {
      const id = Date.now();
      setAlerts((alerts) => [...alerts, { id, ...alertInfo }]);

      if (alertInfo.args.type !== "loading") {
        const timeout = alertInfo.args.timeout ?? 10000;
        setTimeout(() => removeAlert(id), timeout);
      }

      return id;
    },
    [removeAlert],
  );

  const modifyAlert = useCallback((alert: Alert) => {
    setAlerts((alerts) =>
      alerts.map((prevAlert) =>
        prevAlert.id === alert.id ? alert : prevAlert,
      ),
    );
    return alert.id;
  }, []);

  return (
    <ToastContext.Provider value={{ createAlert, removeAlert, modifyAlert }}>
      {children}
      <div className="toast">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.args.type}
            caption={alert.caption}
            onDismiss={() => {
              removeAlert(alert.id);
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
