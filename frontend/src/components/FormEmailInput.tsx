import type { formTypes } from "../types";
import validateEmail from "../util/validateEmail";
import FormInput from "./FormInput";

export default function FormEmailInput<T extends { email: string }>({
  registerOptions,
  inputAttributes,
  ...props
}: formTypes.Input<T>) {
  return (
    <FormInput
      registerOptions={{
        ...registerOptions,
        validate: (value) => {
          return validateEmail(value) || "Invalid email address";
        },
      }}
      inputAttributes={{ ...inputAttributes, autoComplete: "email" }}
      {...props}
    />
  );
}
