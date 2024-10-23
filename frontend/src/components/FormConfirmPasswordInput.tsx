import type { Path, UseFormReturn } from "react-hook-form";

import FormInput from "./FormInput";

export interface FormConfirmPasswordInputProps<
  T extends { password: string; confirmPassword: string },
> {
  form: UseFormReturn<T>;
  disabled?: boolean;
}

export default function FormConfirmPasswordInput<
  T extends { password: string; confirmPassword: string },
>({ form, disabled }: FormConfirmPasswordInputProps<T>) {
  const registerInputProps = form.register("confirmPassword" as Path<T>, {
    required: "Password Confirmation is required",
    validate: (value) => {
      if (form.watch("password" as Path<T>) != value)
        return "Passwords do not match";
    },
  });

  return (
    <FormInput
      name="confirmPassword"
      labelText="Confirm Password"
      registerInputProps={registerInputProps}
      type="password"
      errors={form.formState.errors}
      autoComplete="new-password"
      disabled={disabled}
    />
  );
}
