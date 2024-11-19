import { FieldErrors, FieldValues } from "react-hook-form";
import type { formTypes } from "../types";

import { twMerge } from "../util/twMerge";
import { ErrorMessage } from "@hookform/error-message";
import { MdErrorOutline } from "react-icons/md";

export function FormInput<T extends FieldValues = FieldValues>({
  name,
  label,
  registerOptions,
  inputAttributes,
  form,
  isBuffering,
  required,
}: formTypes.Input<T>) {
  const registerProps = form.register(name, {
    ...registerOptions,
    required: required ? `${label ?? name} is required` : false,
  });

  const { className, disabled, ...otherInputAttributes } = {
    ...inputAttributes,
  };

  return (
    <label className="form-control">
      {label && (
        <div className="label">
          <span>{label}</span>
        </div>
      )}
      <input
        className={twMerge("input input-bordered", className)}
        {...registerProps}
        {...otherInputAttributes}
        disabled={disabled || isBuffering}
      />
      <div className="label">
        <span className="label-text-alt">
          <div className="flex items-center gap-1 text-error">
            <ErrorMessage
              errors={form.formState.errors as FieldErrors}
              name={name}
              render={({ message }) => (
                <>
                  <MdErrorOutline />
                  <p>{message}</p>
                </>
              )}
            />
          </div>
        </span>
      </div>
    </label>
  );
}
