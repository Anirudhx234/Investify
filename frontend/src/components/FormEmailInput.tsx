import type { UseFormReturn, Path } from "react-hook-form";

import emailRegex from "../utils/emailRegex";
import FormTextInput from "./FormTextInput";

export interface FormEmailInputProps<T extends { email: string }> {
  required?: boolean | undefined;
  form: UseFormReturn<T>;
}

export default function FormEmailInput<T extends { email: string }>({
  required,
  form,
}: FormEmailInputProps<T>) {
  const registerInputProps = form.register("email" as Path<T>, {
    required: required ? "Email is required" : false,
    pattern: { value: emailRegex, message: "Invalid email address" },
  });

  return (
    <FormTextInput
      name="email"
      labelText="Email"
      registerInputProps={registerInputProps}
      type="text"
      errors={form.formState.errors}
      autoComplete="email"
    />
  );
}
