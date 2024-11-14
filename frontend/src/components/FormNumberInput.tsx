import type { formTypes } from "../types";

import { FieldValues } from "react-hook-form";
import FormInput from "./FormInput";

export default function FormNumberInput<T extends FieldValues>({
  registerOptions,
  inputAttributes,
  min,
  max,
  decimal,
  ...props
}: formTypes.Input<T> & formTypes.NumberField) {
  return (
    <FormInput
      registerOptions={{
        ...registerOptions,
        min,
        max,
        validate: (value) => {
          if (!decimal && `${value}`.includes(".")) {
            return "Decimal values are not allowed";
          }
        },
      }}
      inputAttributes={{ ...inputAttributes, type: "number" }}
      {...props}
    />
  );
}
