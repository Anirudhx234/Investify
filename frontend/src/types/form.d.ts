/* types relating to forms in the app */
import type { InputHTMLAttributes } from "react";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export type FieldType = "email" | "password" | "confirmPassword" | "number";

/* stuff defined by the domain and not the implementation */
export interface Field<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;
}

export interface NumberField<T extends FieldValues = FieldValues>
  extends Field<T> {
  min?: number | undefined;
  max?: number | undefined;
  decimal?: boolean | undefined;
}

/* stuff defined by the implementation and not the domain */
export interface Input<T extends FieldValues = FieldValues> extends Field<T> {
  isBuffering?: boolean | undefined;
  required?: boolean | undefined;

  form: UseFormReturn<T> /* options will be used to register in form at bottom level */;

  inputAttributes?:
    | Exclude<
        InputHTMLAttributes<HTMLInputElement>,
        RegisterOptions<T, Path<T>>
      >
    | undefined /* these are generated at every level */;

  registerOptions?:
    | Partial<RegisterOptions<T, Path<T>>>
    | undefined /* these are generated at every level */;
}
