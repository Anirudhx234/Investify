import type { UseFormReturn } from "react-hook-form";
import type { HTMLInputAutoCompleteAttribute } from "react";

import FormInput from "./FormInput";
import toTitleCase from "../util/toTitleCase";

export interface FormTextInputProps {
  name: string;
  labelText?: string | undefined;
  form: UseFormReturn;
  required?: boolean | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
}

export default function FormTextInput({
  name,
  labelText,
  form,
  required,
  autoComplete,
  disabled,
}: FormTextInputProps) {
  const label = labelText ?? toTitleCase(name);

  const registerInputProps = form.register(name, {
    required: required ? `${label} is required` : false,
  });

  return (
    <FormInput
      name={name}
      labelText={label}
      registerInputProps={registerInputProps}
      type="text"
      errors={form.formState.errors}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
}
