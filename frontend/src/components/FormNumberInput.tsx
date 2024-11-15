import type { formTypes } from "../types";

import { FieldValues } from "react-hook-form";
import { FormInput } from "./FormInput";

export function FormNumberInput<T extends FieldValues>({
  registerOptions,
  inputAttributes,
  min,
  max,
  decimal,
  ...props
}: formTypes.Input<T> & formTypes.NumberFieldArgs) {
  return (
    <FormInput
      registerOptions={{
        ...registerOptions,
        min,
        max,
        validate: (value) => {
          console.log(decimal);
          if (!decimal && `${value}`.includes(".")) {
            return "Decimal values are not allowed";
          }
        },
      }}
      inputAttributes={{ ...inputAttributes, type: "number", step: "any" }}
      {...props}
    />
  );
}
