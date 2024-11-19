import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { twMerge } from "../util/twMerge";

export interface AlertAttributes {
  type: "success" | "loading" | "error";
  caption?: string | undefined;
  onDismiss?: (() => void) | undefined;
}

export function Alert({ type, caption, onDismiss }: AlertAttributes) {
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

  const iconStyles = "h-6 w-6 shrink-0 stroke-current hidden lg:block";

  return (
    <div
      role="alert"
      className={twMerge(
        "alert z-[999]",
        type === "success" && "alert-success",
        type === "loading" && "alert-warning",
        type === "error" && "alert-error",
      )}
    >
      {type === "success" && <FaCheck className={iconStyles} />}

      {type === "loading" && (
        <span className="loading loading-spinner loading-md"></span>
      )}

      {type === "error" && <MdError className={iconStyles} />}

      <span className="max-w-[50vw] overflow-hidden text-ellipsis whitespace-nowrap">
        {alertCaption}
      </span>

      {onDismiss !== undefined && (
        <div className="hidden items-center lg:flex">
          <button onClick={onDismiss}>
            <RxCrossCircled className={iconStyles} />
          </button>
        </div>
      )}
    </div>
  );
}
