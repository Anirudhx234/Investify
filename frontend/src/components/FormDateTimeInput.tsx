import type { formTypes } from "../types";

import { FieldValues } from "react-hook-form";
import { FormInput } from "./FormInput";

export function FormDateTimeInput<T extends FieldValues>({
  registerOptions,
  inputAttributes,
  ...props
}: formTypes.Input<T>) {
  return (
    <FormInput
      registerOptions={{
        ...registerOptions,
      }}
      inputAttributes={{
        ...inputAttributes,
        type: "datetime-local",
      }}
      {...props}
    />
  );
}
