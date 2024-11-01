import type { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

import twMerge from "../util/twMerge";
import FormErrorMessage from "./FormErrorMessage";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelText: string;
  registerInputProps: UseFormRegisterReturn;
  errors?: FieldErrors | undefined;
}

export default function FormInput({
  name,
  labelText,
  registerInputProps,
  errors,
  className,
  ...props
}: FormInputProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span>{labelText}</span>
      </div>
      <input
        className={twMerge("input input-bordered", className)}
        {...registerInputProps}
        {...props}
      />
      <FormErrorMessage name={name} errors={errors} />
    </label>
  );
}
