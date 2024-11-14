import type { formTypes } from "../types";
import checkPasswordStrength from "../util/checkPasswordStrength";
import FormInput from "./FormInput";

export default function FormPasswordInput<T extends { password: string }>({
  registerOptions,
  inputAttributes,
  ...props
}: formTypes.Input<T>) {
  return (
    <FormInput
      registerOptions={{
        ...registerOptions,
        validate: (value) => checkPasswordStrength(value) ?? true,
      }}
      inputAttributes={{ ...inputAttributes, type: "password" }}
      {...props}
    />
  );
}
