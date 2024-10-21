import type { UseFormReturn, Path } from "react-hook-form";

import emailRegex from "../util/emailRegex";
import FormInput from "./FormInput";

export interface FormEmailInputProps<T extends { email: string }> {
  form: UseFormReturn<T>;
  required?: boolean | undefined;
  disabled?: boolean;
}

export default function FormEmailInput<T extends { email: string }>({
  required,
  form,
  disabled,
}: FormEmailInputProps<T>) {
  const registerInputProps = form.register("email" as Path<T>, {
    required: required ? "Email is required" : false,
    pattern: { value: emailRegex, message: "Invalid email address" },
  });

  return (
    <FormInput
      name="email"
      labelText="Email"
      registerInputProps={registerInputProps}
      type="text"
      errors={form.formState.errors}
      autoComplete="email"
      disabled={disabled}
    />
  );
}
