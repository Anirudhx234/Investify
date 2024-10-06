import type { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import { MdErrorOutline } from "react-icons/md";
import { HTMLInputAutoCompleteAttribute } from "react";

export interface FormTextInputProps {
  name: string;
  labelText: string;
  registerInputProps: UseFormRegisterReturn;
  type?: "text" | "email" | "password" | undefined;
  errors?: FieldErrors | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

export default function FormTextInput({
  name,
  labelText,
  registerInputProps,
  type,
  errors,
  autoComplete
}: FormTextInputProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span>{labelText}</span>
      </div>
      <input
        className="input input-bordered"
        type={type ?? "text"}
        {...registerInputProps}
        autoComplete={autoComplete}
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
