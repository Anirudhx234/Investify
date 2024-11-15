import type { FieldErrors, FieldValues } from "react-hook-form";
import type { formTypes } from "../types";

import { twMerge } from "../util/twMerge";
import { ErrorMessage } from "@hookform/error-message";
import { MdErrorOutline } from "react-icons/md";

export function FormSelectInput<T extends FieldValues>({
  name,
  label,
  registerOptions,
  selectAttributes,
  form,
  options,
  required,
  isBuffering,
}: formTypes.Input<T> & formTypes.SelectFieldArgs) {
  const selectRegisterProps = form.register(name, {
    ...registerOptions,
    required: required ? `${label} is required` : false,
  });

  const { className, disabled, ...otherSelectAttributes } = {
    ...selectAttributes,
  };

  return (
    <label className="form-control">
      <div className="label">
        <span>{label}</span>
      </div>
      <select
        className={twMerge("select select-bordered text-base", className)}
        {...selectRegisterProps}
        {...otherSelectAttributes}
        disabled={disabled || isBuffering}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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
