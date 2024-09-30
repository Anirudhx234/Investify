import type { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { MdErrorOutline } from "react-icons/md";

export interface FormTextInputProps {
  name: string;
  labelText: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  inputType?: string;
}

/* component for text input in forms, includes error message, and a label */
export default function FormTextInput({
  name,
  labelText,
  register,
  errors,
  inputType,
}: FormTextInputProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="~text-xs/sm">{labelText}</span>
      </div>
      <input
        className="input input-primary"
        type={inputType ?? "text"}
        {...register}
      />
      <div className="label">
        <span className="label-text-alt flex">
          <div className="text-error flex items-center gap-1">
            <span className="invisible">{errors[name] ? "" : "no error"}</span>
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
