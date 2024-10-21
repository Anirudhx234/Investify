import type { UseFormReturn } from "react-hook-form";
import type { HTMLInputAutoCompleteAttribute } from "react";

import FormInput from "./FormInput";
import toTitleCase from "../util/toTitleCase";

export interface FormNumberInputProps {
  name: string;
  labelText?: string | undefined;
  form: UseFormReturn;
  required?: boolean | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  disabled?: boolean | undefined;
  min?: number | undefined;
  max?: number | undefined;
  decimal?: boolean | undefined;
}

export default function FormNumberInput({
  name,
  labelText,
  form,
  required,
  autoComplete,
  disabled,
  min,
  max,
  decimal,
}: FormNumberInputProps) {
  const label = labelText ?? toTitleCase(name);

  const registerInputProps = form.register(name, {
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
