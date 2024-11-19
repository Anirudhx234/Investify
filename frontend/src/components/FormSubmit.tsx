import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "../util/twMerge";

export function FormSubmit({
  className,
  isBuffering,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  isBuffering?: boolean | undefined;
}) {
  return (
    <button
      className={twMerge("btn mt-4", className)}
      disabled={disabled || isBuffering}
      {...props}
    >
      {isBuffering && <span className="loading loading-spinner"></span>}
      <span>Submit</span>
      {children}
    </button>
  );
}
