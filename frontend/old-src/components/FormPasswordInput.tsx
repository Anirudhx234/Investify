import type { Path, UseFormReturn } from "react-hook-form";
import type { HTMLInputAutoCompleteAttribute } from "react";

import FormInput from "./FormInput";
import passwordStrengthCheck from "../util/passwordStrengthCheck";

export interface FormPasswordInputProps<T extends { password: string }> {
  form: UseFormReturn<T>;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
}

export default function FormPasswordInput<T extends { password: string }>({
  form,
  autoComplete,
  disabled
}: FormPasswordInputProps<T>) {
  const registerInputProps = form.register("password" as Path<T>, {
    required: "Password is required",
    validate: (value) => {
      return passwordStrengthCheck(value);
    },
  });

  return (
    <FormInput
      name="password"
      labelText="Password"
      registerInputProps={registerInputProps}
      type="password"
      errors={form.formState.errors}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
}
