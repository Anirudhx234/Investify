import type { formTypes } from "../types";

import { FieldValues } from "react-hook-form";
import { FormInput } from "./FormInput";
import { twMerge } from "../util/twMerge";

export function FormRangeInput<T extends FieldValues>({
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
        type: "range",
        step: 1,
        className: twMerge("range", inputAttributes?.className),
      }}
      {...props}
    />
  );
}
