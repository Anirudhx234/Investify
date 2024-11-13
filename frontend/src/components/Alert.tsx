import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

export interface AlertAttributes {
  type: "success" | "loading" | "error";
  caption?: string | undefined;
  onDismiss?: (() => void) | undefined;
}

export default function Alert({ type, caption, onDismiss }: AlertAttributes) {
  const alertModifier = type === "loading" ? "warning" : type;

  let alertCaption: string;
  if (caption) {
    alertCaption = caption;
  } else if (type === "success") {
    alertCaption = "Success!";
  } else if (type === "loading") {
    alertCaption = "Loading...";
  } else {
    alertCaption = "An error occurred.";
  }

  const iconStyles = "h-6 w-6 shrink-0 stroke-current";

  return (
    <div role="alert" className={`alert alert-${alertModifier}`}>
      {type === "success" && <FaCheck className={iconStyles} />}

      {type === "loading" && (
        <span className="loading loading-spinner loading-md"></span>
      )}

      {type === "error" && <MdError className={iconStyles} />}

      <span>{alertCaption}</span>

      {onDismiss !== undefined && (
        <div>
          <button
            className="btn btn-square btn-warning btn-sm"
            onClick={onDismiss}
          >
            <RxCrossCircled className={iconStyles} />
          </button>
        </div>
      )}
    </div>
  );
}
