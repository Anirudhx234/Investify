import type { Path, UseFormReturn } from "react-hook-form";

import FormTextInput from "./FormTextInput";
import passwordStrengthCheck from "../utils/passwordStrengthCheck";

export interface FormPasswordInputProps<T extends { password: string }> {
  form: UseFormReturn<T>;
}

export default function FormPasswordInput<T extends { password: string }>({
  form,
}: FormPasswordInputProps<T>) {
  const registerInputProps = form.register("password" as Path<T>, {
    required: "Password is required",
    validate: (value) => {
      return passwordStrengthCheck(value);
    },
  });

  return (
    <FormTextInput
      name="password"
      labelText="Password"
      registerInputProps={registerInputProps}
      type="password"
      errors={form.formState.errors}
    />
  );
}
