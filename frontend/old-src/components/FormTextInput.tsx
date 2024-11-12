import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { HTMLInputAutoCompleteAttribute } from "react";

import FormInput from "./FormInput";
import toTitleCase from "../util/toTitleCase";

export interface FormTextInputProps<T extends FieldValues = FieldValues> {
  name: string;
  labelText?: string | undefined;
  form: UseFormReturn<T>;
  required?: boolean | undefined;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
}

export default function FormTextInput<T extends FieldValues>({
  name,
  labelText,
  form,
  required,
  autoComplete,
  disabled,
}: FormTextInputProps<T>) {
  const label = labelText ?? toTitleCase(name);

  const registerInputProps = form.register(name as Path<T>, {
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
