import { Path } from "react-hook-form";
import type { formTypes } from "../types";
import FormInput from "./FormInput";

export default function FormConfirmPasswordInput<
  T extends { password: string; confirmPassword: string },
>({
  form,
  inputAttributes,
  registerOptions,
  ...props
}: formTypes.Input<T>) {
  return (
    <FormInput
      registerOptions={{
        ...registerOptions,
        validate: (value) => {
          if (form.watch("password" as Path<T>) !== value) {
            return "Passwords do not match";
          }
        },
      }}
      inputAttributes={{ ...inputAttributes, type: "password", autoComplete: "new-password" }}
      form={form}
      {...props}
    />
  );
}
