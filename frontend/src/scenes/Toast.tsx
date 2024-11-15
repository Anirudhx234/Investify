import { Alert } from "../components/Alert";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { removeAlert } from "../features/toastSlice";

export function Toast() {
  const alerts = useAppSelector((state) => state.toast.alerts);
  const dispatch = useAppDispatch();

  return (
    <div className="toast max-h-[75vh] overflow-auto">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          caption={alert.caption}
          onDismiss={() => dispatch(removeAlert(alert.id))}
        />
      ))}
    </div>
  );
}
