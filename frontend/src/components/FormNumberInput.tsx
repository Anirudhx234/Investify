import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { HTMLInputAutoCompleteAttribute } from "react";

import FormInput from "./FormInput";
import toTitleCase from "../util/toTitleCase";

export interface FormNumberInputProps<T extends FieldValues = FieldValues> {
  name: string;
  labelText?: string | undefined;
  form: UseFormReturn<T>;
  required?: boolean | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  disabled?: boolean | undefined;
  min?: number | undefined;
  max?: number | undefined;
  decimal?: boolean | undefined;
}

export default function FormNumberInput<T extends FieldValues>({
  name,
  labelText,
  form,
  required,
  autoComplete,
  disabled,
  min,
  max,
  decimal,
}: FormNumberInputProps<T>) {
  const label = labelText ?? toTitleCase(name);

  const registerInputProps = form.register(name as Path<T>, {
    required: required ? `${label} is required` : false,
    valueAsNumber: true,
    min,
    max,
    validate: {
      decimal: (value) => `${value}`.includes(".") === !!decimal,
    },
  });

  return (
    <FormInput
      name={name}
      labelText={label}
      registerInputProps={registerInputProps}
      type="number"
      errors={form.formState.errors}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
}
