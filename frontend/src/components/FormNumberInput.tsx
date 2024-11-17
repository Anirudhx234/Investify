import type { formTypes } from "../types";

import { FieldValues } from "react-hook-form";
import { FormInput } from "./FormInput";

export function FormNumberInput<T extends FieldValues>({
  registerOptions,
  inputAttributes,
  min = 0,
  max,
  decimal,
  ...props
}: formTypes.Input<T> & formTypes.NumberFieldArgs) {
  return (
    <FormInput
      registerOptions={{
        ...registerOptions,
        validate: (value) => {
          if (!decimal && `${value}`.includes(".")) {
            return "Decimal values are not allowed";
          }
        },
      }}
      inputAttributes={{
        ...inputAttributes,
        min,
        max,
        type: "number",
        step: decimal ? 0.01 : 1,
      }}
      {...props}
    />
  );
}
