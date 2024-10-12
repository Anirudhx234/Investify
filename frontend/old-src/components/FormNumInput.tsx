import type { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { MdErrorOutline } from "react-icons/md";
import { HTMLInputAutoCompleteAttribute } from "react";

export interface FormNumInputProps {
  name: string;
  labelText: string;
  registerInputProps: UseFormRegisterReturn;
  errors?: FieldErrors | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
}

export default function FormNumInput({
  name,
  labelText,
  registerInputProps,
  errors,
  autoComplete,
  disabled,
}: FormNumInputProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span>{labelText}</span>
      </div>
      <input
        className="input input-bordered"
        type="number"
        {...registerInputProps}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      <div className="label">
        <span className="label-text-alt">
          <div className="flex items-center gap-1 text-error">
            <ErrorMessage
              errors={errors}
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
